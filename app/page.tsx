import Pagination from './components/Pagination';

interface homePageProps {
  searchParams: { page: string };
}

const Home = ({ searchParams }: homePageProps) => {
  return (
    <Pagination
      itemCount={1}
      pageSize={10}
      currentPage={parseInt(searchParams.page)}
    />
  );
};

export default Home;
