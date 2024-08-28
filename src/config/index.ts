const config = {
  API_HOST: process.env.NEXT_PUBLIC_API_HOST,
  isLogistics: Boolean(process.env.NEXT_PUBLIC_IS_LOGISTICS),
  CORE_API_HOST: process.env.NEXT_PUBLIC_CORE_API_HOST,
};

export default config;
