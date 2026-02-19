'use client';
import { useEffect, useState } from 'react';
import { getByParamsApi } from '@/api/api';
import { apiEndPoints } from '@/api/apiEndpoints';
import useAdminStore from '@/stores/adminStore';
import { AllCandidates, columns } from './columns';
import { DataTable } from './data-table';

export default function DemoPage() {
  const [data, setData] = useState<AllCandidates[]>([]);
  const [meta, setMeta] = useState({ page: 1, total: 0, pages: 0 });
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
    };
    fetchData();
  }, [adminDomain, page]);

  return (
    <div className="mt-20 flex min-h-screen items-baseline justify-center bg-white">
      <DataTable columns={columns} data={data} className="max-w-6xl" />
    </div>
  );
}
