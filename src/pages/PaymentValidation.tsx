import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check, X, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Validatepayments } from "@/api/Services/api";

const PaymentValidation = () => {
  const { merchantTransactionId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    const validatePayment = async () => {
      if (!merchantTransactionId) {
        setStatus("failed");
        return;
      }

      try {
        const response = await Validatepayments(merchantTransactionId);

        if (response?.status) {
          setStatus("success");
          setPaymentData(response.data);
        } else {
          setStatus("failed");
        }
      } catch (error) {
        console.error("Payment validation error:", error);
        setStatus("failed");
      }
    };

    validatePayment();
  }, [merchantTransactionId]);

  const handleContinue = () => {
    if (status === "success") {
      navigate("/my-bookings");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="hotel-card">
            <CardContent className="p-8 text-center">
              {status === "loading" && (
                <>
                  <Loader className="w-16 h-16 mx-auto mb-4 animate-spin text-primary" />
                  <h2 className="text-2xl font-bold mb-2">
                    Validating Payment
                  </h2>
                  <p className="text-muted-foreground">
                    Please wait while we confirm your payment...
                  </p>
                </>
              )}

              {status === "success" && (
                <>
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-green-600">
                    Payment Successful!
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Your booking has been confirmed. You will receive a
                    confirmation email shortly.
                  </p>

                  {paymentData && (
                    <div className="bg-muted/30 rounded-lg p-4 mb-6 text-left">
                      <h3 className="font-semibold mb-2">Payment Details</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Transaction ID:</span>
                          <span className="font-mono">
                            {merchantTransactionId}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <span className="text-green-600 font-medium">
                            Paid
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {status === "failed" && (
                <>
                  <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                    <X className="w-8 h-8 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-red-600">
                    Payment Failed
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    There was an issue processing your payment. Please try again
                    or contact support.
                  </p>
                </>
              )}

              <Button
                onClick={handleContinue}
                className="primary-gradient hover-lift"
                disabled={status === "loading"}
              >
                {status === "success" ? "View My Bookings" : "Back to Home"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentValidation;
