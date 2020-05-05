const wsEvents = {
  c_join: "c_join", // { name: string }
  c_narrator: "c_narrator",
  c_start: "c_start",
  s_role: "s_role", // { role: string, position: number }
  c_ready: "c_ready",
  s_narrate: "s_narrate", // { dialogue: number }
  c_narr_ack: "c_narrAck",
  s_act: "s_act", // dependent on role
  c_act: "c_act", // dependent on role
  s_timer_start: "s_timerStart", // { length: number }
  c_vote: "c_vote", // { name: string }
  s_results: "s_results" // TBD
};

module.exports = wsEvents;
