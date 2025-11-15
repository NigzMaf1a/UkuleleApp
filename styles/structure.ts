import { StyleSheet } from "react-native";

const structure = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    gap:14
  },

  row:{
    flexDirection: "row",
    alignItems: "center"
  },

  column:{
    flexDirection: "column",
    alignItems: "center"
  }

});

export default structure;