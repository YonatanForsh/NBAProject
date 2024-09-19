// - - - - - - - - -  משתני דגל - - - - - - - - - -//
const teams: Team[] = []
let playersList: Player[] = []
const baseUrl: string = 'https://nbaserver-q21u.onrender.com/api'
const myTeam: HTMLDivElement = document.querySelector(".myTeam")!
const positionSearch: HTMLInputElement = document.querySelector(".positionSearch")!
const pointsSearch: HTMLInputElement = document.querySelector(".pointsSearch")!
const p3Percent: HTMLInputElement = document.querySelector(".p3Percent")!
const p2Percent: HTMLInputElement = document.querySelector(".p2Percent")!
const searchBtn: HTMLButtonElement = document.querySelector(".searchBtn")!
const rowsInTable: HTMLDivElement = document.querySelector(".rowsInTable")!
const pointsNumber: HTMLParagraphElement = document.querySelector(".pointsNumber")!
const p3Number: HTMLParagraphElement = document.querySelector(".p3Number")!
const p2Number: HTMLParagraphElement = document.querySelector(".p2Number")!
const player1: HTMLDivElement = document.querySelector(".player")!
const cDetails: HTMLDivElement = document.querySelector(".C")!
const pfDetails: HTMLDivElement = document.querySelector(".PF")!
const sfDetails: HTMLDivElement = document.querySelector(".SF")!
const sgDetails: HTMLDivElement = document.querySelector(".SG")!
const pgDetails: HTMLDivElement = document.querySelector(".PG")!
const saveTeamBtn: HTMLButtonElement = document.querySelector(".saveTeamBtn")!



// - - - - - - אתחול העמוד - - - - - - // 



// - - - - - - ממשקים - - - - - - // 
interface Team{
    team: [Player,Player,Player,Player,Player]
}

interface Player {
    _id: string,
    playerName: string,
    age: number,
    position: string,
    twoPercent: number,
    threePercent: number,
    games: number,
    team: string,
    season: string[],
    points: number,
    __v: number
}


// - - - - - - אירועים - - - - - - //
searchBtn.addEventListener("click", getPlayers)
saveTeamBtn.addEventListener("click", saveTeam)
pointsSearch.addEventListener("change", () => { pointsNumber.innerHTML = pointsSearch.value })
p3Percent.addEventListener("change", () => { p3Number.innerHTML = p3Percent.value })
p2Percent.addEventListener("change", () => { p2Number.innerHTML = p2Percent.value })


// - - - - - - פונקציות - - - - - - //
// רשימת השחקנים מבסיס הנתונים
async function getPlayers(): Promise<void> {
    try {
        const response: Response = await fetch(baseUrl + "/filter", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                position: positionSearch.value,
                twoPercent: Number(p2Percent.value),
                threePercent: Number(p3Percent.value),
                points: Number(pointsSearch.value)
            })
        })
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const players: Player[] = await response.json()
        displayPlayersInTheTable(players)
    }
    catch (err) {
        console.log("error")
    }
}


// הצגת השחקנים בטבלה
async function displayPlayersInTheTable(players: Player[]): Promise<void> {
    rowsInTable.innerHTML = ""
    if (players.length == 0){
        alert("לא נמצאו שחקנים תואמים לבקשתך")
        return
    }
    for (const player of players) {
        // יצירת שורה בטבלה
        const row: HTMLTableRowElement = document.createElement("tr")
        row.classList.add("tr")

        // שם השחקן
        const fullName: HTMLElement = document.createElement("td")
        fullName.classList.add("td")
        fullName.textContent = player.playerName

        // עמדה
        const position: HTMLElement = document.createElement("td")
        position.classList.add("td")
        position.textContent = player.position

        // כמות נקודות
        const points: HTMLElement = document.createElement("td")
        points.classList.add("td")
        points.textContent = player.points.toString()

        // אחוז קליעה מ- 2 
        const twoPercent: HTMLElement = document.createElement("td")
        twoPercent.classList.add("td")
        twoPercent.textContent = player.twoPercent.toString()

        // אחוז קליעה מ- 3 
        const threePercent: HTMLElement = document.createElement("td")
        threePercent.classList.add("td")
        threePercent.textContent = player.threePercent.toString()

        // הוספה לקבוצה שלי
        const fname: string = player.playerName.split(" ")[0]
        const tdBtn = document.createElement("td")
        tdBtn.classList.add("td")

        // הוספת כפתור הוספה
        const addBtn: HTMLButtonElement = document.createElement("button")
        addBtn.classList.add("addBtn")
        addBtn.textContent = `הוסף את ${fname} לקבוצה שלך`
        addBtn.addEventListener("click", () => addPlayer(player))

        tdBtn.appendChild(addBtn)

        row.appendChild(fullName)
        row.appendChild(position)
        row.appendChild(points)
        row.appendChild(twoPercent)
        row.appendChild(threePercent)
        row.appendChild(tdBtn)

        rowsInTable.appendChild(row)
    }
}


// הוספת שחקן לקבוצה והצגה שלו בדף
async function addPlayer(player: Player): Promise<void> {
    playersList = playersList.filter(p => p.position != player.position)
    playersList.push(player)
    const name: HTMLParagraphElement = document.createElement("p")
    name.textContent = player.playerName
    const p3: HTMLParagraphElement = document.createElement("p")
    p3.textContent = "Three Percent: " + player.threePercent.toString() + "%"
    const p2: HTMLParagraphElement = document.createElement("p")
    p2.textContent = "Two Percent: " + player.twoPercent.toString() +"%"
    const pnt: HTMLParagraphElement = document.createElement("p")
    pnt.textContent = "Points: " + player.points.toString()

    const pos:string = player.position
    const playerDiv: HTMLDivElement = document.querySelector("." + pos)!
    playerDiv.innerHTML = ""
    playerDiv.appendChild(name)
    playerDiv.appendChild(p3)
    playerDiv.appendChild(p2)
    playerDiv.appendChild(pnt)
    alert(`${player.playerName} !!הצטרף לקבוצתך בהצלחה`)
}

// שמירת קבוצה
async function saveTeam() {
    if(playersList.length == 5){
        try{
        const response: Response = await fetch(baseUrl + "/AddTeam", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify ({
                _id: "001",
                players: playersList
            })
        })
}
        catch(err){
            console.log("error")           
        }
    }
    else{
        alert("יש לשלוח 5 שחקנים!")
    }
}