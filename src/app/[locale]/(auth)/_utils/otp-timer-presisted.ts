export const OtpExpireTime = 60;

export const startOtpTimer = () => {
  if (typeof window === "undefined") return;
  localStorage.setItem("otp_time", Date.now().toString());
};

export const getOtpTimeLeft = () => {
  if (typeof window === "undefined") return 0;

  const savedTime = localStorage.getItem("otp_time");
  if (!savedTime) return 0;

  const diff = OtpExpireTime - Math.floor((Date.now() - Number(savedTime)) / 1000);

  return diff > 0 ? diff : 0;
};
