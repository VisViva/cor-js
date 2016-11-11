/**
 * Value types
 */

const Values = {};
Values[Values["numeric"] = 0] = "numeric";
Values[Values["color"] = 1] = "color";
Values[Values["text"] = 2] = "text";

/**
 * Easing types
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

exports.Values = Easings;
exports.Easings = Easings;
