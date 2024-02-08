import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../model.ts";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export {useTypedSelector}