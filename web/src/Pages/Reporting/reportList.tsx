import { useEffect, useState } from 'react';
import { useConnection } from '../../Context/ConnectionContext/connectionContext';
import { Button, Col, Row } from 'antd';
import './reportList.scss';
import { DownloadOutlined } from '@ant-design/icons';
import LayoutTable from '../../Components/common/Table/layout.table';
import { useTranslation } from 'react-i18next';
import { ExportFileType } from '../../Enums/shared.enum';
import { ReportFiveRecord } from '../../Definitions/reportDefinitions';
import { getReportFiveColumns } from '../../Definitions/columns/reportColumns';
import { displayErrorMessage } from '../../Utils/errorMessageHandler';

const reportList = () => {
  const { post } = useConnection();
  const { t } = useTranslation(['reportTableFive']);

  // General Page State

  const [loading, setLoading] = useState<boolean>(false);

  // Report Five State

  const [reportFiveData, setReportFiveData] = useState<ReportFiveRecord[]>([]);
  const [reportFiveTotal, setReportFiveTotal] = useState<number>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<any>(1);

  const getTableFiveData = async () => {
    setLoading(true);
    try {
      const payload: any = { page: currentPage, size: pageSize };

      const response: any = await post('national/reports/tableFive/query', payload);
      if (response) {
        const tempReportFiveData: ReportFiveRecord[] = [];

        response.data.forEach((entry: any, index: number) => {
          tempReportFiveData.push({
            key: index,
            source: entry.source,
            titleOfAction: entry.titleOfAction,
            description: entry.description,
            objective: entry.objective,
            instrumentType: entry.instrumentType ?? [],
            status: entry.status,
            sector: entry.sector,
            ghgsAffected: entry.ghgsAffected ?? [],
            startYear: entry.startYear,
            implementingEntities: entry.implementingEntities ?? [],
            achievedGHGReduction: entry.achievedGHGReduction,
            expectedGHGReduction: entry.expectedGHGReduction,
          });
        });

        setReportFiveData(tempReportFiveData);
        setReportFiveTotal(response.data.total);
        setLoading(false);
      }
    } catch (error: any) {
      displayErrorMessage(error);
      setLoading(false);
    }
  };

  const handleTableChange = (pagination: any) => {
    // Setting Pagination
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  useEffect(() => {
    getTableFiveData();
  }, [currentPage, pageSize]);

  //Export Report Data

  const downloadReportData = async (exportFileType: string) => {
    setLoading(true);
    try {
      const payload: any = { fileType: exportFileType };
      const response: any = await post('national/reports/tableFive/export', payload);
      if (response && response.data) {
        const url = response.data.url;
        const a = document.createElement('a');
        a.href = url;
        a.download = response.data.fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
      setLoading(false);
    } catch (error: any) {
      displayErrorMessage(error);
      setLoading(false);
    }
  };

  const reportFiveColumns = getReportFiveColumns(t);

  return (
    <div className="content-container report-table5">
      <div className="title-bar">
        <div className="body-title">{t('viewTitle')}</div>
      </div>
      <div className="content-card">
        <Row className="table-actions-section">
          <Col span={16}>
            <div className="action-bar">
              <div className="title">{t('title')}</div>
            </div>
          </Col>
          <Col span={4}>
            <div className="action-bar">
              <Button
                type="primary"
                size="large"
                block
                icon={<DownloadOutlined />}
                onClick={() => {
                  downloadReportData(ExportFileType.XLSX);
                }}
              >
                {t('exportAsExcel')}
              </Button>
            </div>
          </Col>
          <Col span={4}>
            <div className="action-bar">
              <Button
                type="primary"
                size="large"
                block
                icon={<DownloadOutlined />}
                onClick={() => {
                  downloadReportData(ExportFileType.CSV);
                }}
              >
                {t('exportAsCsv')}
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="action-bar">
              <div className="subTitle">{t('subTitle')}</div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <LayoutTable
              tableData={reportFiveData}
              columns={reportFiveColumns}
              loading={loading}
              pagination={{
                total: reportFiveTotal,
                current: currentPage,
                pageSize: pageSize,
                showQuickJumper: true,
                pageSizeOptions: ['10', '20', '30'],
                showSizeChanger: true,
                style: { textAlign: 'center' },
                locale: { page: '' },
                position: ['bottomRight'],
              }}
              handleTableChange={handleTableChange}
              emptyMessage="No Report Data Available"
              handleHorizontalOverflow={true}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default reportList;
