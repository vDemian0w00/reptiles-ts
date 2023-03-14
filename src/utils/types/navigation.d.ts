import { RootDrawerParamsList } from "./navigation";
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootDrawerParamsList {}
  }
}