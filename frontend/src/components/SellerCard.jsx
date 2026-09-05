import { Link } from "react-router-dom";
import {
  MapPin,
  User,
  Star,
  BadgeCheck,
  Gavel,
  TrendingUp,
  CheckCircle2,
  Package,
  ArrowUpRight,
} from "lucide-react";

const SellerCard = ({ seller }) => {
  const fullName = `${seller.firstName || ""} ${seller.lastName || ""}`.trim();

  const displayName =
    seller.companyName ||
    fullName ||
    seller.username ||
    "Seller";

  const location =
    seller.address?.city ||
    seller.countryName ||
    "Location not set";

  const successRate = seller.successRate;

  const hasRating =
    seller.rating !== undefined &&
    seller.rating !== null &&
    Number(seller.rating) > 0;

  const joinedDate = seller.createdAt
    ? new Date(seller.createdAt).getFullYear()
    : null;

  return (
    <Link
      to={`/seller/${seller._id}`}
      className="group block h-full"
    >
      <div className="relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl">

        {/* Top accent */}
        <div className="h-1 bg-gradient-to-r from-[#C59D55] via-[#E0C078] to-[#C59D55]" />

        <div className="p-5">

          {/* Seller identity */}
          <div className="flex items-start gap-4">

            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-100 ring-2 ring-gray-200">
                {seller.image ? (
                  <img
                    src={seller.image}
                    alt={displayName}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <User className="h-full w-full p-4 text-gray-400" />
                )}
              </div>

              {/* Verified */}
              {seller.isVerified && (
                <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-0.5">
                  <BadgeCheck
                    size={21}
                    className="fill-[#C59D55] text-white"
                  />
                </div>
              )}
            </div>

            {/* Name */}
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">

                <h3 className="truncate text-lg font-semibold text-gray-900 transition-colors group-hover:text-[#B4873E]">
                  {displayName}
                </h3>

                <ArrowUpRight
                  size={18}
                  className="shrink-0 text-gray-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#C59D55]"
                />
              </div>

              <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                <MapPin size={14} className="shrink-0" />
                <span className="truncate">{location}</span>
              </div>

              {/* Rating */}
              <div className="mt-2 flex items-center gap-2">

                {/* {hasRating ? (
                  <div className="flex items-center gap-1">
                    <Star
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="text-sm font-semibold text-gray-800">
                      {Number(seller.rating).toFixed(1)}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-gray-400">
                    No ratings yet
                  </span>
                )} */}

                {/* {successRate !== null &&
                  successRate !== undefined && ( */}
                    <>
                      <span className="text-gray-300">•</span>

                      <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                        <TrendingUp size={13} />
                        {successRate || 0}% success
                      </div>
                    </>
                  {/* )} */}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-5 h-px bg-gray-100" />

          {/* Statistics */}
          <div className="grid grid-cols-4 divide-x divide-gray-100">

            {/* Listed */}
            <div className="px-2 text-center first:pl-0">
              <Package
                size={16}
                className="mx-auto mb-1 text-gray-400"
              />

              <p className="text-lg font-bold text-gray-900">
                {seller.listedCount || 0}
              </p>

              <p className="text-[11px] uppercase tracking-wide text-gray-400">
                Listed
              </p>
            </div>

            {/* Active */}
            <div className="px-2 text-center">
              <Gavel
                size={16}
                className="mx-auto mb-1 text-[#C59D55]"
              />

              <p className="text-lg font-bold text-gray-900">
                {seller.activeCount || 0}
              </p>

              <p className="text-[11px] uppercase tracking-wide text-gray-400">
                Active
              </p>
            </div>

            {/* Sold */}
            <div className="px-2 text-center">
              <CheckCircle2
                size={16}
                className="mx-auto mb-1 text-emerald-500"
              />

              <p className="text-lg font-bold text-gray-900">
                {seller.soldCount || 0}
              </p>

              <p className="text-[11px] uppercase tracking-wide text-gray-400">
                Sold
              </p>
            </div>

            {/* Bids */}
            <div className="px-2 text-center last:pr-0">
              <TrendingUp
                size={16}
                className="mx-auto mb-1 text-blue-500"
              />

              <p className="text-lg font-bold text-gray-900">
                {seller.totalBids || 0}
              </p>

              <p className="text-[11px] uppercase tracking-wide text-gray-400">
                Bids
              </p>
            </div>
          </div>

          {/* Success bar */}
          { (
            <div className="mt-5 rounded-xl bg-gray-50 p-3">

              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-600">
                  Sales success rate
                </span>

                <span className="text-xs font-bold text-emerald-600">
                  {successRate || 0}%
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{
                    width: `${Math.min(successRate || 0, 100)}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-[11px] text-gray-400">
                {seller.soldCount || 0} successful sales from{" "}
                {seller.completedCount || 0} completed listings
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">

            {joinedDate && (
              <span className="text-xs text-gray-400">
                Member since {joinedDate}
              </span>
            )}

            <span className="ml-auto text-xs font-semibold text-[#B4873E] opacity-0 transition-all duration-300 group-hover:opacity-100">
              View seller →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SellerCard;