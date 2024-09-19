var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// - - - - - - - - -  משתני דגל - - - - - - - - - -//
var teams = [];
var playersList = [];
var baseUrl = 'https://nbaserver-q21u.onrender.com/api';
var myTeam = document.querySelector(".myTeam");
var positionSearch = document.querySelector(".positionSearch");
var pointsSearch = document.querySelector(".pointsSearch");
var p3Percent = document.querySelector(".p3Percent");
var p2Percent = document.querySelector(".p2Percent");
var searchBtn = document.querySelector(".searchBtn");
var rowsInTable = document.querySelector(".rowsInTable");
var pointsNumber = document.querySelector(".pointsNumber");
var p3Number = document.querySelector(".p3Number");
var p2Number = document.querySelector(".p2Number");
var player1 = document.querySelector(".player");
var cDetails = document.querySelector(".C");
var pfDetails = document.querySelector(".PF");
var sfDetails = document.querySelector(".SF");
var sgDetails = document.querySelector(".SG");
var pgDetails = document.querySelector(".PG");
var saveTeamBtn = document.querySelector(".saveTeamBtn");
// - - - - - - אירועים - - - - - - //
searchBtn.addEventListener("click", getPlayers);
saveTeamBtn.addEventListener("click", saveTeam);
pointsSearch.addEventListener("change", function () { pointsNumber.innerHTML = pointsSearch.value; });
p3Percent.addEventListener("change", function () { p3Number.innerHTML = p3Percent.value; });
p2Percent.addEventListener("change", function () { p2Number.innerHTML = p2Percent.value; });
// - - - - - - פונקציות - - - - - - //
// רשימת השחקנים מבסיס הנתונים
function getPlayers() {
    return __awaiter(this, void 0, void 0, function () {
        var response, players, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(baseUrl + "/filter", {
                            method: "POST",
                            headers: { "content-type": "application/json" },
                            body: JSON.stringify({
                                position: positionSearch.value,
                                twoPercent: Number(p2Percent.value),
                                threePercent: Number(p3Percent.value),
                                points: Number(pointsSearch.value)
                            })
                        })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    players = _a.sent();
                    displayPlayersInTheTable(players);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log("error");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// הצגת השחקנים בטבלה
function displayPlayersInTheTable(players) {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_1, _i, players_1, player;
        return __generator(this, function (_a) {
            rowsInTable.innerHTML = "";
            if (players.length == 0) {
                alert("לא נמצאו שחקנים תואמים לבקשתך");
                return [2 /*return*/];
            }
            _loop_1 = function (player) {
                // יצירת שורה בטבלה
                var row = document.createElement("tr");
                row.classList.add("tr");
                // שם השחקן
                var fullName = document.createElement("td");
                fullName.classList.add("td");
                fullName.textContent = player.playerName;
                // עמדה
                var position = document.createElement("td");
                position.classList.add("td");
                position.textContent = player.position;
                // כמות נקודות
                var points = document.createElement("td");
                points.classList.add("td");
                points.textContent = player.points.toString();
                // אחוז קליעה מ- 2 
                var twoPercent = document.createElement("td");
                twoPercent.classList.add("td");
                twoPercent.textContent = player.twoPercent.toString();
                // אחוז קליעה מ- 3 
                var threePercent = document.createElement("td");
                threePercent.classList.add("td");
                threePercent.textContent = player.threePercent.toString();
                // הוספה לקבוצה שלי
                var fname = player.playerName.split(" ")[0];
                var tdBtn = document.createElement("td");
                tdBtn.classList.add("td");
                // הוספת כפתור הוספה
                var addBtn = document.createElement("button");
                addBtn.classList.add("addBtn");
                addBtn.textContent = "\u05D4\u05D5\u05E1\u05E3 \u05D0\u05EA ".concat(fname, " \u05DC\u05E7\u05D1\u05D5\u05E6\u05D4 \u05E9\u05DC\u05DA");
                addBtn.addEventListener("click", function () { return addPlayer(player); });
                tdBtn.appendChild(addBtn);
                row.appendChild(fullName);
                row.appendChild(position);
                row.appendChild(points);
                row.appendChild(twoPercent);
                row.appendChild(threePercent);
                row.appendChild(tdBtn);
                rowsInTable.appendChild(row);
            };
            for (_i = 0, players_1 = players; _i < players_1.length; _i++) {
                player = players_1[_i];
                _loop_1(player);
            }
            return [2 /*return*/];
        });
    });
}
// הוספת שחקן לקבוצה והצגה שלו בדף
function addPlayer(player) {
    return __awaiter(this, void 0, void 0, function () {
        var name, p3, p2, pnt, pos, playerDiv;
        return __generator(this, function (_a) {
            playersList = playersList.filter(function (p) { return p.position != player.position; });
            playersList.push(player);
            name = document.createElement("p");
            name.textContent = player.playerName;
            p3 = document.createElement("p");
            p3.textContent = "Three Percent: " + player.threePercent.toString() + "%";
            p2 = document.createElement("p");
            p2.textContent = "Two Percent: " + player.twoPercent.toString() + "%";
            pnt = document.createElement("p");
            pnt.textContent = "Points: " + player.points.toString();
            pos = player.position;
            playerDiv = document.querySelector("." + pos);
            playerDiv.innerHTML = "";
            playerDiv.appendChild(name);
            playerDiv.appendChild(p3);
            playerDiv.appendChild(p2);
            playerDiv.appendChild(pnt);
            alert("".concat(player.playerName, " !!\u05D4\u05E6\u05D8\u05E8\u05E3 \u05DC\u05E7\u05D1\u05D5\u05E6\u05EA\u05DA \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4"));
            return [2 /*return*/];
        });
    });
}
// שמירת קבוצה
function saveTeam() {
    return __awaiter(this, void 0, void 0, function () {
        var response, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(playersList.length == 5)) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch(baseUrl + "/AddTeam", {
                            method: "POST",
                            headers: { "content-type": "application/json" },
                            body: JSON.stringify({
                                _id: "001",
                                players: playersList
                            })
                        })];
                case 2:
                    response = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    console.log("error");
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 6];
                case 5:
                    alert("יש לשלוח 5 שחקנים!");
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
