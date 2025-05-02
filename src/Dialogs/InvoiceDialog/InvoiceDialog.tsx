import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { ColspanTd, Container, Header, Table, Td, Th, Tr } from './InvoiceDialog.styled';
import { getFormatStandardDate } from '../../utils/helpers/date';

interface Props {
  open: boolean;
  handleClose: () => void;
  invoiceOrderData: any;
}

const Invoice: React.FC<{ invoiceOrderData: any }> = ({ invoiceOrderData }) => {
  const customerData = invoiceOrderData?.userData;
  const addressData = invoiceOrderData?.addressDetails;
  let grandTotal = 0;
  let totalGst = 0;
  return (
    <Container>
      <Table>
        <tbody>
          <Tr>
            <ColspanTd colSpan={4}>
              <strong>Customer Address</strong>
              <br />
              {customerData?.name}
              <br />
              Email: {customerData?.email}
              <br />
              Number: {customerData?.mobileNumber}
              <br />
              {customerData?.city}, {customerData?.state}, {customerData?.country}, {customerData?.pinCode}.
            </ColspanTd>
            <ColspanTd colSpan={4}>
              <strong>If undelivered, return to:</strong>
              <br />
              VR FASHION
              <br />
              SY.No.68,Plot -5 F Flr GhanshyamNagar
              <br />
              Seri No.2 Baroda Pristej, LabheSvar Police Choki Ni Pase Varachha Road, Surat, Gujarat, 395006.
              <br />
              
            </ColspanTd>
          </Tr>
          <Tr>
            <ColspanTd colSpan={4}>
              <strong>BILL TO / SHIP TO</strong>
              <br />
              {customerData?.name} - {addressData?.addressFirst}, {addressData?.area}, {addressData?.landmark}, {addressData?.city}, {addressData?.state}, {addressData?.country}, {addressData?.pinCode}, Place of Supply: {addressData?.state}
            </ColspanTd>
            <ColspanTd colSpan={4}>
              Sold by: {customerData?.name}
              <br />
              SY.No.68, Plot -5 Gr Flr GhanshyamNagar-2
              <br />
              <strong>GSTIN: 24AMKPB4330Q1ZZ</strong>
            </ColspanTd>
          </Tr>
          <Tr>
            <ColspanTd colSpan={8}>
              <Table>
                <tbody>
                  <Tr>
                    <Th colSpan={8}>Order Details</Th>
                  </Tr>
                  <Tr>
                    <Th colSpan={3}>Payment Id</Th>
                    <Th colSpan={2}>Total Product</Th>
                    <Th colSpan={3}>Date</Th>
                  </Tr>
                  <Tr>
                    <Td colSpan={3}>{invoiceOrderData?.paymentId}</Td>
                    <Td colSpan={2}>{invoiceOrderData?.productDetails?.length}</Td>
                    <Td colSpan={3}>{getFormatStandardDate(invoiceOrderData?.createdAt)}</Td>
                  </Tr>
                </tbody>
              </Table>
            </ColspanTd>
          </Tr>
          <Tr>
            <ColspanTd colSpan={8}>
              <Table>
                <tbody>
                  <Tr>
                    <Th>Name</Th>
                    <Th>HSN</Th>
                    <Th>Qty</Th>
                    <Th>Taxable Value</Th>
                    <Th>Discount</Th>
                    <Th>Gross Amount</Th>
                    <Th>Taxes</Th>
                    <Th>Total</Th>
                  </Tr>
                  {invoiceOrderData?.productDetails?.map((item: any) => {
                    const price = Math.round(item?.product?.price);
                    const discount = isNaN(Number(item?.product?.discount)) ? 0 : Math.round(item?.product?.discount);
                    const discountAmount = Math.round((Number(discount) * Number(price)) / 100);
                    const gst = Math.round(item?.product?.gst);
                    const gstAmount = Math.round((Number(gst) * Number(price)) / 100);
                    const total = Math.round(Number(price) - Number(discountAmount) + Number(gstAmount));
                    const subTotal = Math.round(Number(total) * Number(item?.qty));
                    grandTotal += Number(total);
                    totalGst += Number(gstAmount);
                    return (
                      <Tr>
                        <Td>{item?.product?.name}</Td>
                        <Td>{item?.product?.code}</Td>
                        <Td>{item?.qty}</Td>
                        <Td>Rs.{price}</Td>
                        <Td>Rs.{discountAmount}</Td>
                        <Td>Rs.{total}</Td>
                        <Td>GST @{gst}%<br />Rs.{gstAmount}</Td>
                        <Td>Rs.{subTotal}</Td>
                      </Tr>
                    )
                  })}
                  <Tr>
                    <Th colSpan={6}>Total</Th>
                    <Td>Rs.{totalGst}</Td>
                    <Td>Rs.{grandTotal}</Td>
                  </Tr>
                </tbody>
              </Table>
            </ColspanTd>
          </Tr>
        </tbody>
      </Table>
    </Container>
  );
};

const InvoiceDialog: React.FC<Props> = ({ open, handleClose, invoiceOrderData }) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth scroll={'body'}>
        <DialogTitle sx={{background: '#0a3156', color: '#ffffff'}}>Invoice</DialogTitle>
        <DialogContent>
          <div ref={componentRef}>
            <Invoice invoiceOrderData={invoiceOrderData} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handlePrint} color="primary">Print</Button>
          <Button variant="contained" onClick={handleClose} color='inherit'>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default InvoiceDialog;
