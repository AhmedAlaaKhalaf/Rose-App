// src/components/features/orders/order-card.tsx
"use client";
import { Order } from "@/lib/types/order";
import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Banknote } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";

interface OrderCardProps {
  order: Order;
}

// Status maps will use translations dynamically in component

export default function OrderCard({ order }: OrderCardProps) {
  // Translation
  const t = useTranslations("orders");
  const format = useFormatter();

  // State
  const [showAll, setShowAll] = useState(false);

  // Variables
  const maxProducts = 4;
  const previewCount = 2;

  // Functions
  const formatPrice = (value: number) => format.number(value);
  const formatRating = (value?: number) =>
    format.number(value ?? 0, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  const getStatusLabel = (state: string) => {
    const statusMap: { [key: string]: { label: string; key: string; color: string } } = {
      pending: { label: t("pending"), key: "pending", color: "bg-yellow-500" },
      processing: { label: t("processing"), key: "processing", color: "bg-blue-500" },
      delivered: { label: t("delivered"), key: "delivered", color: "bg-green-500" },
      cancelled: { label: t("cancelled"), key: "cancelled", color: "bg-red-500" },
    };
    return statusMap[state] || { label: state, key: state, color: "bg-gray-400" };
  };

  // Variables
  const status = getStatusLabel(order.state);

  const paymentStatus = order.isPaid
    ? { label: t("paid"), color: "bg-emerald-500" }
    : { label: t("not-paid"), color: "bg-red-500" };

  const deliveryStatus = order.isDelivered
    ? { label: t("delivered"), color: "text-green-600" }
    : { label: t("pending"), color: "text-yellow-600" };

  const orderItems = order.orderItems || [];

  const showToggle = orderItems.length > previewCount;

  const formattedCreatedAt = order.createdAt
    ? format.dateTime(new Date(order.createdAt), {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "N/A";

  return (
    <div className="bg-white shadow-md mx-auto border border-gray-200 rounded-2xl max-w-[1280px] overflow-hidden">
      {/* Header */}
      <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2 bg-[#A6252A] px-3 sm:px-4 py-2 text-white">
        <div className="font-primary font-semibold text-lg sm:text-2xl leading-tight break-all">
          {t("order-header")} {order.orderNumber || `#${order._id}` || "N/A"}
        </div>
        <div className="font-primary font-normal text-sm sm:text-base leading-tight sm:text-right">
          {t("created-in")} {formattedCreatedAt}
        </div>
      </div>

      {/* Content */}
      <div className="bg-gray-50 px-4 pt-4 pb-6 border-gray-200 border-t">
        {/* Total + Payment */}
        <div className="flex lg:flex-row flex-col lg:justify-between lg:items-center gap-3 mb-4 pb-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="font-primary font-medium text-gray-900 text-xl sm:text-2xl leading-tight">
              {t("total-price")} {formatPrice(order.totalPrice || 0)} EGP
            </span>
            <span
              className={`px-3 py-1 rounded-full text-white font-primary font-semibold text-sm sm:text-base leading-none ${paymentStatus.color}`}
            >
              {paymentStatus.label}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-primary font-semibold text-black text-sm sm:text-base leading-none">
              {t("status")}:
            </span>
            <span
              className={`px-3 py-1 rounded-full text-white font-primary font-semibold text-sm sm:text-base leading-none ${status.color}`}
            >
              {status.label}
            </span>
          </div>
        </div>

        <div className="bg-gray-200 mb-4 w-full h-px" />

        {/* Payment + Delivery */}
        <div className="space-y-3 mb-6 text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium" style={{ color: "#71717A" }}>
              {t("payment-method")}
            </span>
            <div className="flex items-center gap-2">
              <Banknote className="w-5 h-5" style={{ color: "#71717A" }} />
              <span className="font-primary font-semibold text-sm sm:text-base leading-none" style={{ color: "#71717A" }}>
                {order.paymentType === "cash" ? t("cash") : t("credit-card")}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-gray-700 text-sm sm:text-base">{t("delivery-status")}</span>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0h-.01M15 17a2 2 0 104 0m-4 0h-.01M9 17h6"
                />
              </svg>
              <span className="font-primary font-semibold text-sm sm:text-base leading-none">
                <span className={deliveryStatus.color}>{deliveryStatus.label}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Products */}
        <div>
          <div className="mb-4 font-semibold text-gray-800">{t("order-items")}</div>

          <div className="bg-white p-5 rounded-xl">
            <div
              className={`relative ${
                !showAll && showToggle ? "max-h-[240px] overflow-hidden" : ""
              }`}
            >
              <div className="gap-5 grid grid-cols-1 md:grid-cols-2">
                {(showAll ? orderItems : orderItems.slice(0, maxProducts))
                  .slice(0, previewCount)
                  .map((item, index) => (
                    <div
                      key={`${item.product._id}-preview-${index}`}
                      className="flex items-stretch gap-0 shadow-sm hover:shadow-md pr-3 sm:pr-5 border border-gray-200 rounded-xl min-h-[130px] sm:min-h-[150px] overflow-hidden transition-all duration-300"
                      style={{ backgroundColor: "#FAFAFA" }}
                    >
                      <div className="relative flex-shrink-0 w-[96px] sm:w-[120px] min-h-full">
                        <Image
                          sizes="auto"
                          src={item.product?.imgCover || "/placeholder.png"}
                          alt={item.product?.title || "Product"}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-col flex-1 justify-between pt-1 pb-2 sm:pb-3 pl-3 sm:pl-4 min-w-0">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-[#8B1538] text-sm sm:text-base line-clamp-2">
                            {item.product?.title || "Product"}
                          </h3>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-yellow-500 text-base sm:text-lg">★</span>
                            <span className="font-medium text-gray-700 text-xs sm:text-sm">
                              {t("rating")} {formatRating(item.product?.rateAvg)}/5
                            </span>
                            <span className="text-blue-600 text-xs sm:text-sm">
                              ({format.number(item.product?.rateCount || 0)} rating
                              {item.product?.rateCount === 1 ? "" : "s"})
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-red-500 text-xs sm:text-sm">
                            (×{item.quantity || 1})
                          </span>
                          <span className="font-bold text-gray-900 text-base sm:text-lg">
                            {formatPrice(item.price || 0)} <span className="text-sm sm:text-base">EGP</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                {(showAll ? orderItems : orderItems.slice(0, maxProducts))
                  .slice(previewCount)
                  .map((item, index) => (
                    <div
                      key={`${item.product._id}-fade-${index}`}
                      className="flex items-stretch gap-0 shadow-sm hover:shadow-md pr-3 sm:pr-5 border border-gray-200 rounded-xl min-h-[130px] sm:min-h-[150px] overflow-hidden transition-all duration-300"
                      style={{
                        backgroundColor: "#FAFAFA",
                        opacity: showAll || !showToggle ? 1 : 0.5,
                      }}
                    >
                      <div className="relative flex-shrink-0 w-[96px] sm:w-[120px] min-h-full">
                        <Image
                          sizes="auto"
                          src={item.product?.imgCover || "/placeholder.png"}
                          alt={item.product?.title || "Product"}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-col flex-1 justify-between pt-1 pb-2 sm:pb-3 pl-3 sm:pl-4 min-w-0">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-[#8B1538] text-sm sm:text-base line-clamp-2">
                            {item.product?.title || "Product"}
                          </h3>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-yellow-500 text-base sm:text-lg">★</span>
                            <span className="font-medium text-gray-700 text-xs sm:text-sm">
                              {t("rating")} {formatRating(item.product?.rateAvg)}/5
                            </span>
                            <span className="text-blue-600 text-xs sm:text-sm">
                              ({format.number(item.product?.rateCount || 0)} rating
                              {item.product?.rateCount === 1 ? "" : "s"})
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-red-500 text-xs sm:text-sm">
                            (×{item.quantity || 1})
                          </span>
                          <span className="font-bold text-gray-900 text-base sm:text-lg">
                            {formatPrice(item.price || 0)} <span className="text-sm sm:text-base">EGP</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {!showAll && showToggle && (
                <div className="bottom-0 absolute inset-x-0 flex justify-center bg-gradient-to-t from-white to-transparent pt-4 pb-4">
                  <button
                    onClick={() => setShowAll(true)}
                    className="flex flex-col items-center hover:opacity-70 font-medium text-[#A6252A] text-base leading-none transition-opacity"
                  >
                    <span>{t("show-all")}</span>
                    <ChevronDown className="mt-1 w-6 h-6 text-[#A6252A]" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {showToggle && showAll && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowAll((s: boolean) => !s)}
                className="flex items-center gap-2 font-medium text-[#A6252A] text-base hover:underline leading-none"
              >
                {showAll ? (
                  <>
                    {t("show-less")}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    {t("show-all")}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
