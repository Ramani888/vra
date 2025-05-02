import React from 'react'
import AppSummaryCard from '../../components/AppSummaryCard/AppSummaryCard'
import { DashboardCategoryName, DashboardCategoryProductChart, DashboardCategoryRevenue, DashboardContainer, DashboardCustomerName, DashboardCustomerRevenue, DashboardRowCategory, DashboardRowCustomer, DashboardSalesChartContainer, DashboardSalesChartWrapper, DashboardSummaryCardContainer, DashboardTopCategoryContainer, DashboardTopCategoryTitle, DashboardTopCategoryWrapper, DashboardTopCustomerContainer, DashboardTopCustomerTitle, DashboardTopCustomerWrapper } from './Dashboard.styled'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import useDashboard from './useDashboard';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { ProductOrderOption } from './ProductOrdersChart.options';
import { CategoryProductOption } from './CategoryProductChart.options';
import { Skeleton } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import ViewListIcon from '@mui/icons-material/ViewList';
import PaymentIcon from '@mui/icons-material/Payment';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { formatNumber } from '../../utils/helpers/global';

const Dashboard = () => {
  const {
    dashboardData,
    loading
  } = useDashboard();

  const AppSummaryCardData = [
    {
      cardTitle: 'User',
      cardCount: dashboardData?.totalUsers,
      Icon: PeopleAltIcon,
      path: '/User'
    },
    {
      cardTitle: 'Product',
      cardCount: dashboardData?.totalProduct,
      Icon: InventoryIcon,
      path: '/Product'
    },
    {
      cardTitle: 'Category',
      cardCount: dashboardData?.totalCategory,
      Icon: CategoryIcon,
      path: '/Category'
    },
    {
      cardTitle: 'Banner',
      cardCount: dashboardData?.totalBanner,
      Icon: ViewCarouselIcon,
      path: '/Banner'
    },
    {
      cardTitle: 'Orders',
      cardCount: dashboardData?.totalOrder,
      Icon: ViewListIcon,
      path: '/Orders'
    },
    {
      cardTitle: 'Total Revenue',
      cardCount: dashboardData?.totalRevenue,
      Icon: PaymentIcon
    }
  ]
  
  return (
    <DashboardContainer>
      <DashboardSummaryCardContainer>
        {AppSummaryCardData?.map((item, index) => {
          return (
            <AppSummaryCard key={index} cardTitle={item?.cardTitle} cardCount={item?.cardCount} Icon={item?.Icon} path={item?.path} loading={loading} />
          )
        })}
      </DashboardSummaryCardContainer>
      <DashboardSalesChartWrapper>
        <DashboardCategoryProductChart>
          {loading ? (
            <Skeleton variant="rounded" height={400} />
          ) : (
            <HighchartsReact
              highcharts={Highcharts}
              options={{...CategoryProductOption, series: [
                {
                  data: dashboardData?.categoryProductChartData
                },
              ]}}
            />
          )}
        </DashboardCategoryProductChart>
        {loading ? (
          <Skeleton variant="rounded" height={400} width={'30%'} />
        ) : (
          <DashboardTopCategoryContainer>
            <DashboardTopCategoryTitle>Top Category Revenue</DashboardTopCategoryTitle>
            <DashboardTopCategoryWrapper>
              {dashboardData?.topCategoryData?.map((item: any) => {
                return (
                  <DashboardRowCategory>
                    <DashboardCategoryName>{item?.name}</DashboardCategoryName>
                    <DashboardCategoryRevenue><CurrencyRupeeIcon sx={{height: '15px', width: '15px'}}/>{formatNumber(item?.totalAmount)}</DashboardCategoryRevenue>
                  </DashboardRowCategory>
                )
              })}
            </DashboardTopCategoryWrapper>
          </DashboardTopCategoryContainer>
        )}
        {loading ? (
          <Skeleton variant="rounded" height={400} width={'30%'} />
        ) : (
          <DashboardTopCustomerContainer>
            <DashboardTopCustomerTitle>Top Customers Revenue</DashboardTopCustomerTitle>
            <DashboardTopCustomerWrapper>
              {dashboardData?.topCustomerData?.map((item: any) => {
                return (
                  <DashboardRowCustomer>
                    <DashboardCustomerName>{item?.user?.name}</DashboardCustomerName>
                    <DashboardCustomerRevenue><CurrencyRupeeIcon sx={{height: '15px', width: '15px'}}/>{formatNumber(item?.totalAmount)}</DashboardCustomerRevenue>
                  </DashboardRowCustomer>
                )
              })}
            </DashboardTopCustomerWrapper>
          </DashboardTopCustomerContainer>
        )}
      </DashboardSalesChartWrapper>
      <DashboardSalesChartContainer>
        {loading ? (
          <Skeleton variant="rounded" height={400} />
        ) : (
          <HighchartsReact
            highcharts={Highcharts}
            options={{...ProductOrderOption, series: [
              {
                name: "Product",
                data: dashboardData?.salesChartData,
              },
            ]}}
          />
        )}
      </DashboardSalesChartContainer>
    </DashboardContainer>
  )
}

export default Dashboard