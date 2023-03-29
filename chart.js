const teams = ["ETHIOPIA", "EGYPT", "ENGLAND", "CAMEROON", "USA", "ARGENTINA", "BRAZIL", "FRANCE", "SPAIN", "PORTUGAL", "SUDAN", "MEXICO", "GERMANY", "SENEGAL", "NORTH KOREA", "MALI"];

let groups = [];

function displayTeams() {
  const teamsList = document.getElementById("teams-list");
  teamsList.innerHTML = "";
  teams.forEach((team) => {
    const listItem = document.createElement("li");
    listItem.innerText = team;
    teamsList.appendChild(listItem);
  });
}

function makeGroups() {
  const shuffled = teams.sort(() => 0.5 - Math.random());
  groups = [
    [shuffled[0], shuffled[1], shuffled[2], shuffled[3]],
    [shuffled[4], shuffled[5], shuffled[6], shuffled[7]],
    [shuffled[8], shuffled[9], shuffled[10], shuffled[11]],
    [shuffled[12], shuffled[13], shuffled[14], shuffled[15]],
  ];
  const groupsList = document.getElementById("groups-list");
  groupsList.innerHTML = "";
  groups.forEach((group, index) => {
    const groupHeader = document.createElement("h2");
    groupHeader.innerText = "Group " + String.fromCharCode(65 + index);
    groupsList.appendChild(groupHeader);
    const groupList = document.createElement("ul");
    group.forEach((team) => {
      const listItem = document.createElement("li");
      listItem.innerText = team;
      groupList.appendChild(listItem);
    });
    groupsList.appendChild(groupList);
  });
}

function makePieChart() {
  const teamInput = document.getElementById("team-input").value.trim();
  const pointsInput = document.getElementById("points-input").value.trim();
  const points = parseInt(pointsInput, 10);
  if (isNaN(points)) {
    alert("Points must be a number.");
    return;
  }
  const teamIndex = teams.indexOf(teamInput);
  if (teamIndex === -1) {
    alert("Invalid team name.");
    return;
  }
  const teamPoints = new Array(groups.length).fill(0);
  groups.forEach((group, groupIndex) => {
    const teamPosition = group.indexOf(teamInput);
    if (teamPosition !== -1) {
      teamPoints[groupIndex] = points;
    } else {
      group.forEach((team) => {
        const otherTeamIndex = teams.indexOf(team);
        if (otherTeamIndex !== teamIndex) {
          const otherTeamPointsInput = prompt(`Enter points earned by ${team} in Group ${String.fromCharCode(65 + groupIndex)}.`);
          const otherTeamPoints = parseInt(otherTeamPointsInput, 10);
          if (isNaN(otherTeamPoints)) {
            alert(`Points earned by ${team} must be a number.`);
            return;
          }
          teamPoints[groupIndex] += otherTeamPoints;
        }
      });
    }
  });
  const chartCanvas = document.getElementById("pie-chart");
  chartCanvas.width = chartCanvas.offsetWidth;
  chartCanvas.height = chartCanvas.offsetHeight;
  const ctx = chartCanvas.getContext("2d");
  ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
  const chartData = {
    labels: groups.map((_, index) => String.fromCharCode(65 + index)),
    datasets: [
      {
        label: teamInput,
        data: teamPoints,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
        ]
      }
    ]
  }}