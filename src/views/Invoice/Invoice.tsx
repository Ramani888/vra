import React, { useRef } from 'react';
import styled from 'styled-components';
import { useReactToPrint } from 'react-to-print';

interface Props {

}

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
  border: 1px solid #000;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddressSection = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
`;

const CustomerAddress = styled.div`
width: 50%;
`
const AdminAddress = styled.div`
width: 50%;
`

const QRCodeSection = styled.div`
  width: 40%;
  text-align: right;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Section = styled.div`
  margin-top: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const Th = styled.th`
  border: 1px solid #000;
  padding: 8px;
  text-align: left;
  background-color: #f2f2f2;
`;

const Td = styled.td`
  border: 1px solid #000;
  padding: 8px;
`;

const Invoice = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Container ref={ref}>
      <Header>
        <AddressSection>
          <CustomerAddress>
            <p><strong>Customer Address</strong><br />
              anurag tiwari<br />
              bake bihari fashion house<br />
              kuthaund rod ento<br />
              pani ki tanki ke pass<br />
              Madhogarh, Uttar Pradesh, 285129
            </p>
          </CustomerAddress>
          <AdminAddress>
            <p><strong>If undelivered, return to:</strong><br />
              SHIV IMITATION<br />
              SY.No.68, Plot -5 Gr Flr GhanshyamNagar Seri<br />
              No.2 Baroda Pristej, LabheSvar Police Choki Ni<br />
              Pase Varachha Road, Surat, Gujarat, Pincode 395006<br />
              LabheSvar Police Choki Ni Pase Varachha Road<br />
              Surat, Gujarat, 395006
            </p>
          </AdminAddress>
        </AddressSection>
        {/* <QRCodeSection>
          <Title>Shadowfax</Title>
          <p>Pickup<br />Destination Code: N17_AIT_Ramp<br />Return Code: 395006,753878</p>
          <img src="your-qr-code-url" alt="QR Code" />
        </QRCodeSection> */}
      </Header>

      <Section>
        <SectionTitle>Product Details</SectionTitle>
        <Table>
          <thead>
            <tr>
              <Th>SKU</Th>
              <Th>Size</Th>
              <Th>Qty</Th>
              <Th>Color</Th>
              <Th>Order No.</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>N928</Td>
              <Td>20</Td>
              <Td>1</Td>
              <Td>Gold</Td>
              <Td>29276775147057344_1</Td>
            </tr>
          </tbody>
        </Table>
      </Section>

      <Section>
        <SectionTitle>Tax Invoice</SectionTitle>
        <Table>
          <thead>
            <tr>
              <Th>Description</Th>
              <Th>HSN</Th>
              <Th>Qty</Th>
              <Th>Gross Amount</Th>
              <Th>Discount</Th>
              <Th>Taxable Value</Th>
              <Th>Taxes</Th>
              <Th>Total</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>Unique Finger Rings For Men - 20</Td>
              <Td>7117</Td>
              <Td>1</Td>
              <Td>Rs.282.00</Td>
              <Td>Rs.0.00</Td>
              <Td>Rs.273.79</Td>
              <Td>IGST @3.0% Rs.8.21</Td>
              <Td>Rs.282.00</Td>
            </tr>
            <tr>
              <Td>Other Charges</Td>
              <Td>7117</Td>
              <Td>NA</Td>
              <Td>Rs.0.00</Td>
              <Td>Rs.0.00</Td>
              <Td>Rs.0.00</Td>
              <Td>IGST @3.0% Rs.0.00</Td>
              <Td>Rs.0.00</Td>
            </tr>
          </tbody>
        </Table>
      </Section>

      <Section>
        <p>Tax is not payable on reverse charge basis...</p>
      </Section>
    </Container>
  );
});

Invoice.displayName = 'Invoice';

const InvoiceWrapper: React.FC<Props> = ({  }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <Invoice ref={componentRef} />
      <button onClick={handlePrint}>Print Invoice</button>
    </div>
  );
};

export default InvoiceWrapper;
