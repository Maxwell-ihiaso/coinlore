import Image from 'next/image';
import { Divider } from '@mui/material';
import DashboardHeader from '@/component/header';
import EnhancedTable from '@/component/table';
import Footer from '@/component/footer';

export default function Home() {
  return (
    <main style={{ position: 'relative' }}>
      <DashboardHeader />
      <Divider />
      <EnhancedTable />
      <Footer />
    </main>
  );
}
