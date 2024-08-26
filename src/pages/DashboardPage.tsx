import React, { useEffect, useState } from 'react';
import { Container, Grid, Header, Loader, Segment, Statistic } from 'semantic-ui-react';
import axios from 'axios';
import PieChartComponent from '../components/PieChartComponent';

interface DashboardData {
    totalFarmers: number;
    totalArea: number;
    farmersByState: { state: string; count: string }[];
    cropsDistribution: { crop: string; count: string }[];
    landUsage: {
      arableArea: number;
      vegetationArea: number;
    };
};

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/farmers/dashboard')
      .then(response => {
        setDashboardData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the dashboard data!', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const farmersByStateData = dashboardData?.farmersByState?.map((item) => ({
    name: item.state,
    value: Number(item.count),
  }));

  const cropsDistributionData = dashboardData?.cropsDistribution?.map((item) => ({
    name: item.crop,
    value: Number(item.count),
  }));

  if (loading) {
    return <Loader active inline="centered" />;
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
