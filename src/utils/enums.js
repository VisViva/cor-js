/**
 * Easing functions
 */

const Easings = {};
Easings[Easings["step"] = 0] = "step";
Easings[Easings["linear"] = 1] = "linear";
Easings[Easings["quad"] = 2] = "quad";
Easings[Easings["cubic"] = 3] = "cubic";
Easings[Easings["quart"] = 4] = "quart";
Easings[Easings["quint"] = 5] = "quint";
Easings[Easings["sine"] = 6] = "sine";
Easings[Easings["expo"] = 7] = "expo";
Easings[Easings["circ"] = 8] = "circ";
Easings[Easings["elastic"] = 9] = "elastic";
Easings[Easings["back"] = 10] = "back";
Easings[Easings["bounce"] = 11] = "bounce";

const Values = {};
Values[Values["simple"] = 0] = "simple";
Values[Values["color"] = 1] = "color";
Values[Values["text"] = 2] = "text";

exports.Easings = Easings;
