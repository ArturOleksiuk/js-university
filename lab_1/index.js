function triangle(value1, type1, value2, type2) {
    const types = [
        "leg",
        "hypotenuse",
        "adjacent angle",
        "opposite angle",
        "angle",
    ];

    const MIN_VALUE = 1e-4;
    const MAX_VALUE = 1e4;
    if (!types.includes(type1) || !types.includes(type2)) {
        console.log("Некоректний тип аргументу!");
        return "failed";
    }
    if (value1 <= 0 || value2 <= 0) {
        console.log("Введені значення не можуть бути від'ємними або нульовими");
        return "failed";
    }
    if (
        value1 < MIN_VALUE ||
        value2 < MIN_VALUE ||
        value1 > MAX_VALUE ||
        value2 > MAX_VALUE
    ) {
        console.log("Введені значення не входять в допустимий діапазон");
        return "failed";
    }
    const toRadians = (angle) => (angle * Math.PI) / 180;
    const toDegrees = (radians) => (radians * 180) / Math.PI;

    let a, b, c, alpha, beta;

    if (type1 === "leg" && type2 === "leg") {
        a = value1;
        b = value2;
        c = Math.sqrt(a ** 2 + b ** 2);
        alpha = toDegrees(Math.atan(a / b));
        beta = 90 - alpha;
    } else if (
        (type1 === "leg" && type2 === "hypotenuse") ||
        (type1 === "hypotenuse" && type2 === "leg")
    ) {
        a = type1 === "leg" ? value1 : value2;
        c = type1 === "hypotenuse" ? value1 : value2;
        if (a >= c) {
            console.log("Катет не бути більшим або рівним гіпотенузі.");
            return "failed";
        }
        b = Math.sqrt(c ** 2 - a ** 2);
        alpha = toDegrees(Math.asin(a / c));
        beta = 90 - alpha;
    } else if (
        (type1 === "leg" && type2 === "adjacent angle") ||
        (type1 === "adjacent angle" && type2 === "leg")
    ) {
        a = value1 === "leg" ? value1 : value2;
        beta = value1 === "adjacent angle" ? value1 : value2;
        if (beta <= 0 || beta >= 90) {
            console.log("Кут має бути гострим.");
            return "failed";
        }
        b = a * Math.tan(toRadians(alpha));
        c = a / Math.cos(toRadians(alpha));
        alpha = 90 - beta;
    } else if (
        (type1 === "leg" && type2 === "opposite angle") ||
        (type1 === "opposite angle" && type2 === "leg")
    ) {
        a = type1 === "leg" ? value1 : value2;
        alpha = type2 === "opposite angle" ? value1 : value2;
        if (beta <= 0 || beta >= 90) {
            console.log("Кут має бути гострим.");
            return "failed";
        }
        b = a / Math.tan(toRadians(alpha));
        c = a / Math.sin(toRadians(alpha));
        beta = 90 - alpha;
    } else if (
        (type1 === "hypotenuse" && type2 === "angle") ||
        (type2 === "hypotenuse" && type1 === "angle")
    ) {
        c = type1 === "hypotenuse" ? value1 : value2;
        alpha = type1 === "angle" ? value1 : value2;

        if (alpha <= 0 || alpha >= 90) {
            console.log("Кут має бути гострим.");
            return "failed";
        }
        a = c * Math.sin(toRadians(alpha));
        b = c * Math.cos(toRadians(alpha));
        beta = 90 - alpha;
    } else {
        console.log("Некоректні типи аргументів.");
        return "failed";
    }

    console.log(
        `a = ${a.toFixed(2)}, b = ${b.toFixed(2)}, c = ${c.toFixed(
            2
        )}, alpha = ${alpha.toFixed(2)}°, beta = ${beta.toFixed(2)}°`
    );
    return "success";
}

console.log(triangle(7, "leg", 18, "hypotenuse"));
console.log(triangle(60, "opposite angle", 5, "leg"));
console.log(triangle(43.13, "angle", -4, "hypotenuse"));
console.log(triangle(0.00000001, "leg", 10000000, "leg"));
console.log(triangle(10, "leg", 40, "leg"));
