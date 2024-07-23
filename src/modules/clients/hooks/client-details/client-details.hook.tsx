import { getPortfolioFromClient } from "@/services/portfolios/portfolios";
import { IDataSection } from "@/types/portfolios/IPortfolios";
import { extractSingleParam } from "@/utils/utils";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export const useClientDetails = () => {
  const [portfolioData, setPortfolioData] = useState<IDataSection | undefined>(undefined);
  const params = useParams();

  const clientIdParam = extractSingleParam(params.clientId);
  const projectIdParam = extractSingleParam(params.projectId);

  const clientId = clientIdParam ? parseInt(clientIdParam) : undefined;
  const projectId = projectIdParam ? parseInt(projectIdParam) : undefined;

  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (!portfolioData) {
        const response: IDataSection = await getPortfolioFromClient(projectId, clientId);
        setPortfolioData(response);
      }
    };
    fetchPortfolioData();
  }, [clientId, portfolioData, projectId]);

  return { portfolioData };
};
