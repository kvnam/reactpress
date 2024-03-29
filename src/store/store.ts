import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/index";

export const useRPDispatch = () => useDispatch<AppDispatch>();
export const useRPSelector: TypedUseSelectorHook<RootState> = useSelector;
