import { useParams as useParamsRRD } from "react-router-dom";

const convertToNumberIfPossible = (
  candidate: string | number
): string | number => {
  return !isNaN(parseFloat(String(candidate))) && isFinite(Number(candidate))
    ? Number(candidate)
    : candidate;
};

export const useParams = <T extends Object>(args: T): Required<T> => {
  const params = useParamsRRD();
  return {
    ...args,
    ...Object.entries(params).reduce(
      (acc, [key, value]) =>
        value == undefined
          ? acc
          : { ...acc, [key]: convertToNumberIfPossible(value) },
      {}
    ),
  } as Required<T>;
};
