import Image from 'next/image';
import { Divider } from '@mui/material';
import DashboardHeader from '@/component/header';
import EnhancedTable from '@/component/table';

export default function Home() {
  return (
    <main>
      <DashboardHeader />
      <Divider />
      <EnhancedTable />
    </main>
  );
}
