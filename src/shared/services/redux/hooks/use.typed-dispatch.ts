import {useDispatch} from "react-redux";
import {AppDispatch} from "../model.ts";

export const useTypedDispatch = () => useDispatch<AppDispatch>();