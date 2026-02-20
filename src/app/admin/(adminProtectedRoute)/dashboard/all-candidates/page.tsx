'use client';

import { useEffect, useState } from 'react';
import { getByParamsApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import axiosInstance from '@/api/translator';
import useAdminStore from '@/stores/adminStore';
import { AllCandidates, columns } from './columns';
import { DataTable } from './data-table';
import { Button } from '@/components/ui/button';
import { handleToastApiResponse } from '@/lib/helpers';

export default function DemoPage() {
  const [data, setData] = useState<AllCandidates[]>([]);
  const [meta, setMeta] = useState({ page: 1, total: 0, pages: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const admin = useAdminStore((state) => state.admin);

  const adminDomain = admin?.domain ? admin.domain : 'web developer';
  const limit = 1000;
  const [page, setPage] = useState(1);

  //take domain from admin storage and hit the api

  // const userDomain = () => {
  //   switch (admin?.domain) {
  //     case 'web developer':
  //       return 'web developer';
  //     case 'android developer':
  //       return 'android developer';
  //     case 'machine learning':
  //       return 'machine learning';
  //     case 'programmer':
  //       return 'programmer';
  //     case 'desinger':
  //       return 'designer';
  //     default:
  //       return '';
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const url = `${apiEndPoints.admin.getCandidatesByDomain(adminDomain)}`;
      const response = await getByParamsApi(url, {
        limit,
        page,
      });
      if (response.status === 200) {
        setData(response.data.data);
        setMeta(response.data.meta);
      } else {
        console.error('Error fetching users:', response.data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [adminDomain, page]);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await axiosInstance.get(apiEndPoints.admin.exportUsers, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting users:', error);
      handleToastApiResponse(500, error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="mt-20 flex min-h-screen items-baseline justify-center bg-white">
      <div className="w-full max-w-6xl">
        <div className="mb-4 flex justify-end">
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black underline underline-offset-4 shadow-none transition-colors hover:bg-transparent"
          >
            {isExporting ? 'Exporting...' : 'Download All Users'}
          </Button>
        </div>
        <DataTable columns={columns} data={data} className="max-w-6xl" isLoading={isLoading} />
      </div>
    </div>
  );
}
