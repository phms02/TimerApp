import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

let timer: NodeJS.Timeout | null = null;  // Variable to store the timer, initialized as NULL because every time the user starts or refreshes the application, the timer will be reset to NULL.
let seconds: number = 0;  // Variable to store the SECONDS.
let minutes: number = 0;  // Variable to store the MINUTES.
let hours: number = 0;  // Variable to store the HOURS...

export default function App() {
  const [time, setTime] = useState<string>("00:00:00");
  const [buttonText, setButtonText] = useState<string>("Start");
  const [lastTime, setLastTime] = useState<string | null>(null);

  //* Functions areas...
  //? Function to start/stop the timer.
  function start() {
    if(timer !== null) {  //? Stop the timer!
      clearInterval(timer);
      timer = null;
      setButtonText("Start");
    } else {  //? Start the timer and count the time!
      timer = setInterval(() => {
        seconds++;

        if(seconds === 60) {
          seconds = 0;
          minutes++;
        }

        if(minutes === 60) {
          minutes = 0;
          hours++;
        }

        //? Formatting the time to display two digits...
        const formattedHours: string = (hours < 10 ? "0" + hours : hours).toString();  // Formatted hours.
        const formattedMinutes: string = (minutes < 10 ? "0" + minutes : minutes).toString();  // Formatted minutes.
        const formattedSeconds: string = (seconds < 10 ? "0" + seconds : seconds).toString();  // Formatted seconds.
        const formattedFullTime: string = formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;  // Formatted full time (hours, minutes and seconds).

        setTime(formattedFullTime);
      }, 1000);

      setButtonText("Pause");
    }
  }

  //? Function to clear the timer.
  function clear() {
    if(timer !== null) {
      clearInterval(timer);
      timer = null;
    }

    setLastTime(time);
    seconds = 0;
    minutes = 0;
    hours = 0;

    setTime("00:00:00");
    setButtonText("Start");
  }

  return (
    <LinearGradient colors={[ "#22C1C3", "#215A5B", "#000000" ]} style={styles.container}>
      <StatusBar style="auto" />

      <Image source={require("../assets/timer.png")} />

      <Text style={styles.timer}>{time}</Text>

      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.button} onPress={start}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={clear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.lastTimeArea}>
        <Text style={styles.lastTimeText}>
          {lastTime ? `Last recorded time: ${lastTime}` : ""}
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2B6AD0",
  },

  timer: {
    fontSize: 40,
    fontWeight: "bold",
    marginTop: -160,
    color: "#FFFFFF",
  },

  buttonArea: {
    flexDirection: "row",
    marginTop: 130,
    height: 45,
  },

  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    margin: 20,
    backgroundColor: "#0083FF",
    borderRadius: 10,
  },

  buttonText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  lastTimeArea: {
    marginTop: 20,
  },

  lastTimeText: {
    fontSize: 22,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#FFE900",
  },
});