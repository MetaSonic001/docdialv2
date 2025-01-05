'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = 'force-dynamic';

// Separate component that uses useSearchParams
function AppointmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!searchParams) {
    router.push('/');
    return null;
  }

  const appointmentDetails = {
    hospitalId: searchParams.get('hospitalId') || 'N/A',
    doctorId: searchParams.get('doctorId') || 'N/A',
    date: searchParams.get('date')
      ? new Date(searchParams.get('date') as string).toLocaleDateString()
      : 'N/A',
    slot: searchParams.get('slot') || 'N/A',
    price: searchParams.get('price') || 'N/A',
    reason: searchParams.get('reason') || 'N/A',
    additionalInfo: searchParams.get('additionalInfo') || 'N/A',
  };

  const handleEdit = () => {
    router.back();
  };

  const handleConfirm = () => {
    if (!appointmentDetails.hospitalId || !appointmentDetails.doctorId || !appointmentDetails.date) {
      alert('Some required details are missing.');
      return;
    }
    router.push('/booking-confirmation');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Appointment Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p><strong>Date:</strong> {appointmentDetails.date}</p>
          <p><strong>Time:</strong> {appointmentDetails.slot}</p>
          <p><strong>Price:</strong> ${appointmentDetails.price}</p>
          <p><strong>Reason for Visit:</strong> {appointmentDetails.reason}</p>
          <p><strong>Additional Information:</strong> {appointmentDetails.additionalInfo}</p>
          <div className="flex space-x-4">
            <Button onClick={handleEdit}>Edit Details</Button>
            <Button onClick={handleConfirm}>Confirm and Pay</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Main component with Suspense boundary
export default function AppointmentSummary() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<p>Loading appointment details...</p>}>
        <AppointmentContent />
      </Suspense>
    </div>
  );
}