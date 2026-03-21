import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../navigation/types";
import Button from "../components/Button";

type Nav = DrawerNavigationProp<RootDrawerParamList>

export default function HamburgerButton() {

  const navigation = useNavigation<Nav>()

  return (
    <Button
      label="☰"
      fun={() => navigation.openDrawer()}
    />
  )
}
