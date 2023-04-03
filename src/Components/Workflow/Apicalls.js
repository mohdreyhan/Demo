import { ApiServices } from "@oasis/js-data";

export const workflowInitialCall = (portfolioId, responsibleId) => {
    try {
        ApiServices("account")
            .get(
                `v1/workflows?appcategory=PORTFOLIO&portfolioId=${portfolioId}&responsibleId=${responsibleId}&start=0&limit=5&fields=null`,
                {}
            )
            .then((response) => {
                setWorkflowCurrentValue(response?.data?.result?.workflows);
            })
            .catch((error) => {
                return false;
            });
    } catch (error) {
        console.error(error);
    }
};
export async function fetchFlowList(portfolioId, responsibleId, scheduleId) {
    try {
        let response = await ApiServices("account").get(
            `v1/workflows?appcategory=PORTFOLIO&portfolioId=${portfolioId}&responsibleId=${responsibleId}&scheduleId=${scheduleId}&start=0&limit=5&fields=null`,
            {}
        );
        return response?.data?.result?.workflows;

    } catch (error) {
        console.error(error);
    }
}
export async function fetchFlowData(portfolioId, responsibleId, flowId) {
    try {
        let response = await ApiServices("account").get(
            `v1/workflows?appcategory=PORTFOLIO&portfolioId=${portfolioId}&responsibleId=${responsibleId}&flowId=${flowId}&start=0&limit=5&fields=null`,
            {}
        );
        return response?.data?.result?.workflows;
    } catch (error) {
        console.error(error);
    }
}
