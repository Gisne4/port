const config = {
  type: Phaser.AUTO,
  width: 605,
  height: 605,
  parent: "#clock-container",
  scene: {
    create: create,
    update: update,
  },
  transparent: true,
};

const game = new Phaser.Game(config);
let hourHand;
let minuteHand;
let secondHand;
let centerCircle;

function create() {
  const centerX = config.width / 2;
  const centerY = config.height / 2;
  const radius = 300;

  // Draw the clock face
  const face = this.add.graphics();
  face.fillStyle(0xf5f5ed);
  face.fillCircle(centerX, centerY, radius);

  //draw out line
  face.lineStyle(4, 0x3b3d36);
  face.strokeCircle(centerX, centerY, radius);

  const textStyle = {
    fontFamily: `'Times New Roman', Times, serif`,
    fontSize: "40px",
    color: `rgb(212, 177, 17)`,
  };

  // Draw hour markers
  let rome = "XII,I,II,III,IV,V,VI,VII,VIII,IX,X,XI,";
  let time = rome.split(",");
  for (let i = 0; i < 12; i++) {
    const angle = Phaser.Math.DegToRad(i * 30 - 90); // -90 to start at the top
    const angleDeg = i * 30;
    const x = centerX + Math.cos(angle) * (radius - 40);
    const y = centerY + Math.sin(angle) * (radius - 40);
    const text = this.add.text(x, y, time[i], textStyle);
    text.angle = angleDeg;
    text.setOrigin(0.5, 0.5);
  }

  //inner clock scale
  const innerRadius1 = radius - 60;
  const innerRadius2 = radius - 70;
  face.lineStyle(2, 0x3b3d36);
  for (let i = 0; i < 12; i++) {
    const angle = Phaser.Math.DegToRad(i * 30 - 90);
    const startX1 = centerX + Math.cos(angle) * innerRadius1;
    const startY1 = centerY + Math.sin(angle) * innerRadius1;
    const endX1 = centerX + Math.cos(angle) * innerRadius2;
    const endY1 = centerY + Math.sin(angle) * innerRadius2;
    face.lineBetween(startX1, startY1, endX1, endY1);
    face.lineStyle(1, 0x3b3d36);
    face.strokeCircle(centerX, centerY, innerRadius2 - 3);
  }

  //minute Marker
  face.fillStyle(0x3b3d36);
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      //  this if were for don't draw on the hour marks
      const angle = Phaser.Math.DegToRad(i * 6 - 90);
      const x = centerX + Math.cos(angle) * (radius - 15);
      const y = centerY + Math.sin(angle) * (radius - 15);
      face.fillCircle(x, y, 3);
    }
  }
  //month Marker
  for (let i = 0; i < 12; i++) {
    const angle = Phaser.Math.DegToRad(i * 30 - 90);
    const x = centerX - 100 + Math.cos(angle) * (radius - 250);
    const y = centerY + 100 + Math.sin(angle) * (radius - 250);
    const dotRadius = 2;
    face.fillStyle(0x23261e);
    face.fillCircle(x, y, dotRadius);
    face.fillStyle(0x23261e);
    face.fillCircle(centerX - 100, centerY + 100, 4);
    face.lineStyle(1, 0xa1810d);
    face.strokeCircle(centerX - 100, centerY + 100, radius - 240);
    face.strokeCircle(centerX - 100, centerY + 100, radius - 236);
  }

  //day Marker
  for (let i = 0; i < 30; i++) {
    const angle = Phaser.Math.DegToRad(i * 12 - 90);
    const x = centerX + 100 + Math.cos(angle) * (radius - 230);
    const y = centerY + 100 + Math.sin(angle) * (radius - 230);
    const dotRadius = 2;

    face.fillStyle(0x23261e);
    face.fillCircle(x, y, dotRadius);

    face.fillStyle(0x23261e);
    face.fillCircle(centerX + 100, centerY + 100, 5);

    face.lineStyle(1, 0xa1810d);
    face.strokeCircle(centerX + 100, centerY + 100, radius - 225);
    face.strokeCircle(centerX + 100, centerY + 100, radius - 220);
  }

  //week day
  const weekdayTextStyle = {
    fontFamily: `'Times New Roman', Times, serif`,
    fontSize: "20px",
    fontWeight: "normal",
    color: `rgb(19, 52, 80)`, // Steel Blue
    align: "center",
  };
  const weekendTextStyle = {
    ...weekdayTextStyle, // Inherit weekday styles
    color: `rgb(255, 0, 0)`, // Red for weekends
  };
  weekdayText = this.add.text(
    centerX - 100,
    centerY - 20,
    "",
    weekdayTextStyle
  );
  weekdayText.setOrigin(0.5, 0.5);

  // Create the hands
  hourHand = this.add.graphics();
  minuteHand = this.add.graphics();
  secondHand = this.add.graphics();
  monthHand = this.add.graphics();
  dayHand = this.add.graphics();

  // Center circle
  centerCircle = this.add.graphics();
  centerCircle.fillStyle(0xf5f5ed);
  centerCircle.fillCircle(centerX, centerY, 8);

  // Center circle Stroke
  centerCircle.lineStyle(3, 0xb53616);
  centerCircle.strokeCircle(centerX, centerY, 8);

  const logoStyle = {
    fontFamily: `'Cafe24Lovingu' , 'Times New Roman'`,
    fontSize: "20px",
    color: `rgb(212, 177, 17)`,
  };
  const logo = this.add.text(centerX, centerY - 100, "FlexDesign", logoStyle);
  logo.setOrigin(0.5, 0.5);

  // Initial draw of the hands (will be updated in update())
  updateHands(this);
}

function update() {
  updateHands(this);
}

function updateHands(scene) {
  const now = new Date();
  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const month = now.getMonth();
  const day = now.getDate() % 30;
  const dayOfWeek = now.getDay();

  const centerX = config.width / 2;
  const centerY = config.height / 2;
  const monthLength = 40;
  const dayLength = 40;
  const hourLength = 160;
  const minuteLength = 200;
  const secondLength = 280;

  // Calculate angles (adjust for starting at the top and clockwise movement)
  const hourAngle = Phaser.Math.DegToRad(hours * 30 + minutes * 0.5 - 90);
  const minuteAngle = Phaser.Math.DegToRad(minutes * 6 - 90);
  const secondAngle = Phaser.Math.DegToRad(seconds * 6 - 90);
  const monthAngle = Phaser.Math.DegToRad((month + 1) * 30 - 90);
  const dayAngle = Phaser.Math.DegToRad(day * 12 - 90);

  // Clear previous hand drawings
  hourHand.clear();
  minuteHand.clear();
  secondHand.clear();
  monthHand.clear();
  dayHand.clear();

  // Draw hour hand
  hourHand.lineStyle(6, 0x000000);
  hourHand.beginPath();
  hourHand.moveTo(centerX, centerY);
  hourHand.lineTo(
    centerX + Math.cos(hourAngle) * hourLength,
    centerY + Math.sin(hourAngle) * hourLength
  );
  hourHand.strokePath();

  // Draw minute hand
  minuteHand.lineStyle(4, 0x000000);
  minuteHand.beginPath();
  minuteHand.moveTo(centerX, centerY);
  minuteHand.lineTo(
    centerX + Math.cos(minuteAngle) * minuteLength,
    centerY + Math.sin(minuteAngle) * minuteLength
  );
  minuteHand.strokePath();

  // Draw second hand
  secondHand.beginPath();
  secondHand.lineStyle(2, 0xb53616);
  secondHand.moveTo(centerX, centerY);
  secondHand.lineTo(
    centerX + Math.cos(secondAngle) * secondLength,
    centerY + Math.sin(secondAngle) * secondLength
  );
  secondHand.lineTo(
    centerX - Math.cos(secondAngle) * 80,
    centerY - Math.sin(secondAngle) * 80
  );
  secondHand.strokePath();

  // Draw month hand
  monthHand.lineStyle(2, 0x000000);
  monthHand.beginPath();
  monthHand.moveTo(centerX - 100, centerY + 100);
  monthHand.lineTo(
    centerX - 100 + Math.cos(monthAngle) * monthLength,
    centerY + 100 + Math.sin(monthAngle) * monthLength
  );
  monthHand.strokePath();

  // Draw day hand
  dayHand.lineStyle(2, 0x000000);
  dayHand.beginPath();
  dayHand.moveTo(centerX + 100, centerY + 100);
  dayHand.lineTo(
    centerX + 100 + Math.cos(dayAngle) * dayLength,
    centerY + 100 + Math.sin(dayAngle) * dayLength
  );
  dayHand.strokePath();

  //weekend
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const weekdayTextStyle = {
    fontFamily: `'Times New Roman', Times, serif`,
    fontSize: "20px",
    fontWeight: "normal",
    color: `rgb(14, 42, 66)`,
    align: "center",
  };
  const weekendTextStyle = {
    ...weekdayTextStyle,
    color: `rgb(255, 0, 0)`,
  };
  if (dayOfWeek == 0 || dayOfWeek == 6) {
    weekdayText.setStyle(weekendTextStyle);
  } else {
    weekdayText.setStyle(weekdayTextStyle);
  }
  weekdayText.setText(weekdays[dayOfWeek]);
}
