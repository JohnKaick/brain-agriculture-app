import React from 'react';
import { Container, Grid, Header, Loader, Segment, Statistic } from 'semantic-ui-react';
import PieChartComponent from '../components/PieChartComponent';
import { useDashboard } from '../contexts/DashboardContext';

const Dashboard: React.FC = () => {
  const { dashboardData, loading } = useDashboard();

  const farmersByStateData = dashboardData?.farmersByState?.map((item) => ({
    name: item.state,
    value: Number(item.count),
  }));

  const cropsDistributionData = dashboardData?.cropsDistribution?.map((item) => ({
    name: item.crop,
    value: Number(item.count),
  }));

  if (loading) {
    return <Loader active inline="centered" content="Carregando..." />;
  }

  if (dashboardData && Object.keys(dashboardData).length === 0) {
    return <Header as="h2" textAlign="center">Cadastre agricultores para iniciar a dashboard</Header>;
  }

  return (
    <Container>
      <Header as="h1" textAlign="center">Dashboard</Header>
      
      <Segment>
        <Statistic.Group widths="four">
          <Statistic>
            <Statistic.Value>{dashboardData?.totalFarmers}</Statistic.Value>
            <Statistic.Label>Total de fazendas (qts)</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{dashboardData?.totalArea}</Statistic.Value>
            <Statistic.Label>Total de fazendas (ha)</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{dashboardData?.landUsage.arableArea}</Statistic.Value>
            <Statistic.Label>Total área agricultável (ha)</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{dashboardData?.landUsage.vegetationArea}</Statistic.Value>
            <Statistic.Label>Total área de vegetação (ha)</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </Segment>

      <Grid columns={2} divided>
        <Grid.Column>
          <PieChartComponent data={farmersByStateData || []} title="Distribuição de Estados" />
        </Grid.Column>
        <Grid.Column>
          <PieChartComponent data={cropsDistributionData || []} title="Distribuição de Culturas" />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Dashboard;
