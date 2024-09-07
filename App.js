import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Vibration,
  Dimensions,
} from "react-native";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState("");
  const [lastNumber, setLastNumber] = useState("");

  const buttons = [
    ["C", "DEL", "/"],
    [7, 8, 9, "*"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];

  function calculator() {
    let lastArr = currentNumber[currentNumber.length - 1];

    if (
      lastArr === "/" ||
      lastArr === "*" ||
      lastArr === "-" ||
      lastArr === "+" ||
      lastArr === "."
    ) {
      setCurrentNumber(currentNumber);
      return;
    } else {
      let result = eval(currentNumber).toString();
      setCurrentNumber(result);
      return;
    }
  }

  function handleInput(buttonPressed) {
    if (
      buttonPressed === "+" ||
      buttonPressed === "-" ||
      buttonPressed === "*" ||
      buttonPressed === "/"
    ) {
      Vibration.vibrate(35);
      setCurrentNumber(currentNumber + buttonPressed);
      return;
    } else if (
      buttonPressed === 1 ||
      buttonPressed === 2 ||
      buttonPressed === 3 ||
      buttonPressed === 4 ||
      buttonPressed === 5 ||
      buttonPressed === 6 ||
      buttonPressed === 7 ||
      buttonPressed === 8 ||
      buttonPressed === 9 ||
      buttonPressed === 0 ||
      buttonPressed === "."
    ) {
      Vibration.vibrate(35);
    }

    switch (buttonPressed) {
      case "DEL":
        Vibration.vibrate(35);
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        return;
      case "C":
        Vibration.vibrate(35);
        setLastNumber("");
        setCurrentNumber("");
        return;
      case "=":
        Vibration.vibrate(35);
        setLastNumber(currentNumber + "=");
        calculator();
        return;
    }
    setCurrentNumber(currentNumber + buttonPressed);
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: darkMode ? "#282f3b" : "#f5f5f5",
    },
    results: {
      flex: 2,
      backgroundColor: darkMode ? "#282f3b" : "#f5f5f5",
      width: "100%",
      alignItems: "flex-end",
      justifyContent: "flex-end",
    },
    resultText: {
      color: "#00b9d6",
      margin: 15,
      fontSize: 40,
    },
    historyText: {
      color: darkMode ? "#B5B7BB" : "#7c7c7c",
      fontSize: 20,
      marginRight: 10,
    },
    themeButton: {
      position: "absolute",
      top: 30,
      left: 20,
      backgroundColor: darkMode ? "#7b8084" : "#e5e5e5",
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttons: {
      flex: 5,
      backgroundColor: darkMode ? "#282f3b" : "#f5f5f5",
    },
    row: {
      flexDirection: "row",
    },
    button: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      minHeight: Dimensions.get("window").height / 8,
      margin: 5,
      borderRadius: 10,
      backgroundColor: darkMode ? "#303946" : "#fff",
    },
    buttonWide: {
      flex: 2,
      justifyContent: "center",
      alignItems: "center",
      margin: 5,
      borderRadius: 10,
      backgroundColor: darkMode ? "#303946" : "#fff",
    },
    textButton: {
      fontSize: 28,
      color: darkMode ? "#b5b7bb" : "#7c7c7c",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton}>
          <Entypo
            name={darkMode ? "light-up" : "moon"}
            size={24}
            color={darkMode ? "white" : "black"}
            onPress={() => setDarkMode(!darkMode)}
          />
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      <View style={styles.buttons}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={{ flexDirection: "row" }}>
            {row.map((button) => (
              <TouchableOpacity
                key={button}
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      typeof button === "number" || button === "."
                        ? darkMode
                          ? "#303946"
                          : "#fff"
                        : darkMode
                        ? "#414853"
                        : "#ededed",
                  },
                ]}
                onPress={() => handleInput(button)}
              >
                <Text
                  style={[
                    styles.textButton,
                    {
                      color: button === "=" ? "white" : "#000",
                    },
                  ]}
                >
                  {button}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
