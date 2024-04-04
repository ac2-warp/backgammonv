"use client";
import React from "react";
import { DiceRoll, Player, PlayerColour, Point, View } from "@/lib/interfaces";
import {
  canBeTaken,
  canMoveHere,
  isOccupied,
  removeFromDice,
} from "@/lib/moves";

type GamePlayContextType = {
  loading: boolean;
  view: View;
  points: Point[];
  selectedPoint: Point | null;
  selectedBarColour: PlayerColour | null;
  playerColour: PlayerColour;
  dice: DiceRoll;
  possibleMoves: number[];

  white: Player;
  black: Player;

  swopView: () => void;
  swopPlayer: () => void;
  roll: (die1: number, die2: number) => void;
  selectChecker: (pointNumber: number) => void;
  selectPoint: (point: Point) => void;
  moveChecker: (toPoint: Point) => void;
  moveBareOff: () => void;
  moveToBar: (toPoint: Point) => void;
  resetGame: () => void;
  addToBar: (playerColour: PlayerColour) => void;
  removeFromBar: (playerColour: PlayerColour) => void;
  selectBar: (player: Player) => void;
  devAction: () => void;
};

export const GamePlayContext = React.createContext<GamePlayContextType | null>(
  null
);

export default function GamePlayContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [view, setView] = React.useState<View>("WhiteHomeBoard");

  // initialize
  React.useEffect(() => {
    // load last board view
    const _boardView = localStorage.getItem("boardView") as View;
    if (_boardView) {
      setView(_boardView);
      if (_boardView === "WhiteHomeBoard") setPoints(whiteBoardView);
      if (_boardView === "BlackHomeBoard") setPoints(blackBoardView);
    } else {
      localStorage.setItem("boardView", "WhiteHomeBoard");
    }

    // load last player
    const _playerColour = localStorage.getItem("player") as PlayerColour;
    if (_playerColour) {
      setPlayerColour(_playerColour);
    }

    // load board setup
    const _whiteBoardView = localStorage.getItem("whiteBoardView");
    if (_whiteBoardView) {
      setWhiteBoardView(JSON.parse(_whiteBoardView) as Point[]);
      if (_boardView === "WhiteHomeBoard")
        setPoints(JSON.parse(_whiteBoardView));
    }
    const _blackBoardView = localStorage.getItem("blackBoardView");
    if (_blackBoardView) {
      setBlackBoardView(JSON.parse(_blackBoardView) as Point[]);
      if (_boardView === "BlackHomeBoard")
        setPoints(JSON.parse(_blackBoardView));
    }

    // load last dice
    const _dice = localStorage.getItem("dice");
    if (_dice) setDice(JSON.parse(_dice));

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [white, setWhite] = React.useState<Player>({
    colour: "white",
    barCount: 0,
    offCount: 0,
    homeCount: 0,
  });
  const [black, setBlack] = React.useState<Player>({
    colour: "black",
    barCount: 0,
    offCount: 0,
    homeCount: 0,
  });

  // prettier-ignore
  const defaultWhiteBoard: Point[] = [
    { pointNumber: 12, checkerCount: 5, occupiedBy: white, location: "top", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 11, checkerCount: 0, occupiedBy: null, location: "top", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 10, checkerCount: 0, occupiedBy: null, location: "top", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 9, checkerCount: 0, occupiedBy: null, location: "top", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 8, checkerCount: 3, occupiedBy: black, location: "top", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 7, checkerCount: 0, occupiedBy: null, location: "top", selected: false, possibleMove: false, bareOff: false},
    // ----- BAR
    { pointNumber: 6, checkerCount: 5, occupiedBy: black, location: "top", selected: false, possibleMove: false, bareOff: false},
    { pointNumber: 5, checkerCount: 0, occupiedBy: null, location: "top", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 4, checkerCount: 0, occupiedBy: null, location: "top", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 3, checkerCount: 0, occupiedBy: null, location: "top", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 2, checkerCount: 0, occupiedBy: null, location: "top", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 1, checkerCount: 2, occupiedBy: white, location: "top", selected: false, possibleMove: false, bareOff: false },
    // --------------- SIDE SPLIT
    { pointNumber: 13, checkerCount: 5, occupiedBy: black, location: "bottom", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 14, checkerCount: 0, occupiedBy: null, location: "bottom", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 15, checkerCount: 0, occupiedBy: null, location: "bottom", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 16, checkerCount: 0, occupiedBy: null, location: "bottom", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 17, checkerCount: 3, occupiedBy: white, location: "bottom", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 18, checkerCount: 0, occupiedBy: null, location: "bottom", selected: false, possibleMove: false, bareOff: false},
    // ----- BAR
    { pointNumber: 19, checkerCount: 5, occupiedBy: white, location: "bottom", selected: false, possibleMove: false, bareOff: false},
    { pointNumber: 20, checkerCount: 0, occupiedBy: null, location: "bottom", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 21, checkerCount: 0, occupiedBy: null, location: "bottom", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 22, checkerCount: 0, occupiedBy: null, location: "bottom", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 23, checkerCount: 0, occupiedBy: null, location: "bottom", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 24, checkerCount: 2, occupiedBy: black, location: "bottom", selected: false, possibleMove: false, bareOff: false },
  ]
  // prettier-ignore
  const defaultBlackBoard: Point[] = [
    { pointNumber: 24, checkerCount: 2, occupiedBy: black, location: "top", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 23, checkerCount: 0, occupiedBy: null, location: "top", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 22, checkerCount: 0, occupiedBy: null, location: "top", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 21, checkerCount: 0, occupiedBy: null, location: "top", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 20, checkerCount: 0, occupiedBy: null, location: "top", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 19, checkerCount: 5, occupiedBy: white, location: "top", selected: false, possibleMove: false, bareOff: false},
    // ----- BAR
    { pointNumber: 18, checkerCount: 0, occupiedBy: null, location: "top", selected: false, possibleMove: false, bareOff: false},
    { pointNumber: 17, checkerCount: 3, occupiedBy: white, location: "top", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 16, checkerCount: 0, occupiedBy: null, location: "top", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 15, checkerCount: 0, occupiedBy: null, location: "top", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 14, checkerCount: 0, occupiedBy: null, location: "top", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 13, checkerCount: 5, occupiedBy: black, location: "top", selected: false, possibleMove: false, bareOff: false },
    // --------------- SIDE SPLIT
    { pointNumber: 1, checkerCount: 2, occupiedBy: white, location: "bottom", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 2, checkerCount: 0, occupiedBy: null, location: "bottom", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 3, checkerCount: 0, occupiedBy: null, location: "bottom", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 4, checkerCount: 0, occupiedBy: null, location: "bottom", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 5, checkerCount: 0, occupiedBy: null, location: "bottom", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 6, checkerCount: 5, occupiedBy: black, location: "bottom", selected: false, possibleMove: false, bareOff: false},
    // ----- BAR
    { pointNumber: 7, checkerCount: 0, occupiedBy: null, location: "bottom", selected: false, possibleMove: false, bareOff: false},
    { pointNumber: 8, checkerCount: 3, occupiedBy: black, location: "bottom", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 9, checkerCount: 0, occupiedBy: null, location: "bottom", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 10, checkerCount: 0, occupiedBy: null, location: "bottom", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 11, checkerCount: 0, occupiedBy: null, location: "bottom", selected: false, possibleMove: false, bareOff: false },
    { pointNumber: 12, checkerCount: 5, occupiedBy: white, location: "bottom", selected: false, possibleMove: false, bareOff: false },
  ]

  const [whiteBoardView, setWhiteBoardView] =
    React.useState<Point[]>(defaultWhiteBoard);

  const [blackBoardView, setBlackBoardView] =
    React.useState<Point[]>(defaultBlackBoard);

  const [points, setPoints] = React.useState<Point[]>(whiteBoardView);
  const [selectedPoint, setSelectedPoint] = React.useState<Point | null>(null);
  const [selectedBarColour, setSelectedBarColour] =
    React.useState<PlayerColour | null>(null);
  const [playerColour, setPlayerColour] = React.useState<PlayerColour>("white");
  const [dice, setDice] = React.useState<DiceRoll>([0, 0]);
  const [possibleMoves, setPossibleMoves] = React.useState<number[]>([]);

  const swopView = () => {
    const currentView = view;
    if (currentView === "WhiteHomeBoard") {
      localStorage.setItem("boardView", "BlackHomeBoard");
      setView("BlackHomeBoard");
      setPoints(blackBoardView);
    } else {
      localStorage.setItem("boardView", "WhiteHomeBoard");
      setView("WhiteHomeBoard");
      setPoints(whiteBoardView);
    }
  };

  const swopPlayer = () => {
    localStorage.setItem(
      "player",
      playerColour === "black" ? "white" : "black"
    );
    setPlayerColour((prev) => (prev === "white" ? "black" : "white"));
  };

  const resetPlayers = () => {
    setPlayerColour("white");
    setWhite({
      colour: "white",
      barCount: 0,
      offCount: 0,
      homeCount: 0,
    });
    setBlack({
      colour: "black",
      barCount: 0,
      offCount: 0,
      homeCount: 0,
    });
  };

  const roll = (die1: number, die2: number) => {
    resetPossibleMoves();
    resetSelection();
    setDice([die1, die2]);
    calculatePlayerStats();
    localStorage.setItem("dice", JSON.stringify([die1, die2]));
  };

  const resetDice = () => {
    setDice([0, 0]);
    localStorage.removeItem("dice");
  };

  const selectChecker = (pointNumber: number) => {
    if (dice[0] === 0 && dice[1] === 0) return;

    if (selectedPoint?.pointNumber === pointNumber) {
      resetSelection();
      resetPossibleMoves();
      return;
    }

    resetSelection();

    const whiteView = [...whiteBoardView];
    const blackView = [...blackBoardView];

    const whitePointIndex = whiteView.findIndex(
      (point) => point.pointNumber === pointNumber
    );
    const blackPointIndex = blackView.findIndex(
      (point) => point.pointNumber === pointNumber
    );

    whiteView[whitePointIndex].selected = true;
    blackView[blackPointIndex].selected = true;

    setWhiteBoardView(whiteView);
    setBlackBoardView(blackView);

    if (view === "WhiteHomeBoard") {
      setSelectedPoint(whiteView[whitePointIndex]);
      calculatePossibleMoves(whiteView[whitePointIndex]);
    }
    if (view === "BlackHomeBoard") {
      setSelectedPoint(blackView[blackPointIndex]);
      calculatePossibleMoves(blackView[blackPointIndex]);
    }
  };

  const selectPoint = (point: Point) => {
    setSelectedPoint(point);
  };

  const selectBar = (player: Player) => {
    setSelectedBarColour(playerColour);

    calculatePossibleMoves({
      checkerCount: 1,
      location: "bar",
      occupiedBy: player,
      pointNumber: 0,
      possibleMove: false,
      selected: true,
      bareOff: false,
    });
  };

  const resetSelection = () => {
    const whiteView = [...whiteBoardView];
    const blackView = [...blackBoardView];

    whiteView.forEach((point) => (point.selected = false));
    blackView.forEach((point) => (point.selected = false));

    setWhiteBoardView(whiteView);
    setBlackBoardView(blackView);

    setSelectedPoint(null);
  };

  const moveToBar = (toPoint: Point) => {
    if (!selectedBarColour) return;
    if (toPoint.checkerCount === 5) return;
    if (!toPoint.possibleMove) return;
    if (isOccupied(toPoint, selectedBarColour)) {
      if (!canBeTaken(toPoint, selectedBarColour)) {
        return;
      }
    }

    if (selectedBarColour) {
      const whiteView = [...whiteBoardView];
      const blackView = [...blackBoardView];

      // Calculate points moved - this is used for determining which die to remove
      let pointsMoved: number = 0;
      if (playerColour === "white") pointsMoved = toPoint.pointNumber - 0;
      if (playerColour === "black") pointsMoved = 0 - toPoint.pointNumber;

      // get the 'to' point indexes
      const whiteToPointIndex = whiteView.findIndex(
        (point) => point.pointNumber === toPoint.pointNumber
      );
      const blackToPointIndex = blackView.findIndex(
        (point) => point.pointNumber === toPoint.pointNumber
      );

      if (canBeTaken(whiteView[whiteToPointIndex], playerColour)) {
        whiteView[whiteToPointIndex].occupiedBy =
          selectedBarColour === "white" ? white : black;
        whiteView[whiteToPointIndex].checkerCount = 1;
        addToBar(playerColour === "black" ? "white" : "black");
      } else {
        whiteView[whiteToPointIndex].occupiedBy =
          selectedBarColour === "white" ? white : black;
        whiteView[whiteToPointIndex].checkerCount += 1;
      }

      if (canBeTaken(blackView[blackToPointIndex], playerColour)) {
        blackView[blackToPointIndex].occupiedBy =
          selectedBarColour === "white" ? white : black;
        blackView[blackToPointIndex].checkerCount = 1;
        addToBar(playerColour === "black" ? "white" : "black");
      } else {
        blackView[blackToPointIndex].occupiedBy =
          selectedBarColour === "white" ? white : black;
        blackView[blackToPointIndex].checkerCount += 1;
      }

      if (selectedBarColour === "white") removeFromBar("white");
      if (selectedBarColour === "black") removeFromBar("black");

      setWhiteBoardView(whiteView);
      setBlackBoardView(blackView);

      resetPossibleMoves();
      resetSelection();

      const newDice = removeFromDice(pointsMoved, dice);
      if (newDice[0] === 0 && newDice[1] === 0) swopPlayer();
      setDice(newDice);
    }
  };

  const moveChecker = (toPoint: Point) => {
    if (!selectedPoint) return;
    if (selectedPoint?.checkerCount === 0) return;
    if (toPoint.checkerCount === 5) return;
    if (!toPoint.possibleMove) return;
    if (isOccupied(toPoint, selectedPoint.occupiedBy?.colour)) {
      if (!canBeTaken(toPoint, playerColour)) {
        return;
      }
    }

    if (selectedPoint) {
      const whiteView = [...whiteBoardView];
      const blackView = [...blackBoardView];

      // Calculate points moved - this is used for determining which die to remove
      let pointsMoved: number = 0;
      if (playerColour === "white")
        pointsMoved = toPoint.pointNumber - selectedPoint.pointNumber;
      if (playerColour === "black")
        pointsMoved = selectedPoint.pointNumber - toPoint.pointNumber;

      // get the 'from' and 'to' point indexes
      const whiteFromPointIndex = whiteView.findIndex(
        (point) => point.pointNumber === selectedPoint.pointNumber
      );
      const whiteToPointIndex = whiteView.findIndex(
        (point) => point.pointNumber === toPoint.pointNumber
      );
      const blackFromPointIndex = blackView.findIndex(
        (point) => point.pointNumber === selectedPoint.pointNumber
      );
      const blackToPointIndex = blackView.findIndex(
        (point) => point.pointNumber === toPoint.pointNumber
      );

      if (canBeTaken(whiteView[whiteToPointIndex], playerColour)) {
        whiteView[whiteToPointIndex].occupiedBy = selectedPoint.occupiedBy;
        whiteView[whiteToPointIndex].checkerCount = 1;
        whiteView[whiteFromPointIndex].checkerCount -= 1;
        addToBar(playerColour === "black" ? "white" : "black");
      } else {
        whiteView[whiteToPointIndex].occupiedBy = selectedPoint.occupiedBy;
        whiteView[whiteToPointIndex].checkerCount += 1;
        whiteView[whiteFromPointIndex].checkerCount -= 1;
      }

      if (canBeTaken(blackView[blackToPointIndex], playerColour)) {
        blackView[blackToPointIndex].occupiedBy = selectedPoint.occupiedBy;
        blackView[blackToPointIndex].checkerCount = 1;
        blackView[blackFromPointIndex].checkerCount -= 1;
        addToBar(playerColour === "black" ? "white" : "black");
      } else {
        blackView[blackToPointIndex].occupiedBy = selectedPoint.occupiedBy;
        blackView[blackToPointIndex].checkerCount += 1;
        blackView[blackFromPointIndex].checkerCount -= 1;
      }

      // increase home count if in home zone
      if (playerColour === "white" && toPoint.pointNumber <= 6) {
        setWhite((prev) => ({ ...prev, homeCount: (prev.homeCount += 1) }));
      }

      if (playerColour === "black" && toPoint.pointNumber >= 19) {
        setBlack((prev) => ({ ...prev, homeCount: (prev.homeCount += 1) }));
      }

      setWhiteBoardView(whiteView);
      setBlackBoardView(blackView);

      localStorage.setItem("whiteBoardView", JSON.stringify(whiteView));
      localStorage.setItem("blackBoardView", JSON.stringify(blackView));

      calculatePlayerStats();
      resetPossibleMoves();
      resetSelection();

      const newDice = removeFromDice(pointsMoved, dice);
      if (newDice[0] === 0 && newDice[1] === 0) swopPlayer();
      setDice(newDice);
    }
  };

  const moveBareOff = () => {
    if (!selectedPoint) return;
    if (selectedPoint?.checkerCount === 0) return;

    const whiteView = [...whiteBoardView];
    const blackView = [...blackBoardView];

    const whiteFromPointIndex = whiteView.findIndex(
      (point) => point.pointNumber === selectedPoint.pointNumber
    );
    const blackFromPointIndex = blackView.findIndex(
      (point) => point.pointNumber === selectedPoint.pointNumber
    );

    const checkerCountWhite = whiteView[whiteFromPointIndex].checkerCount - 1;
    const checkerCountBlack = blackView[blackFromPointIndex].checkerCount - 1;

    // white
    if (
      playerColour === "white" &&
      selectedPoint.occupiedBy?.colour === "white" &&
      possibleMoves.includes(25)
    ) {
      whiteView[whiteFromPointIndex].checkerCount =
        checkerCountWhite > 0 ? checkerCountWhite : 0;
      blackView[blackFromPointIndex].checkerCount =
        checkerCountBlack > 0 ? checkerCountBlack : 0;

      setWhiteBoardView(whiteView);
      setBlackBoardView(whiteView);

      setWhite((prev) => ({
        ...prev,
        offCount: prev.offCount + 1,
        homeCount: prev.homeCount - 1,
        canBareOff: false,
      }));

      localStorage.setItem("whiteBoardView", JSON.stringify(whiteView));
      localStorage.setItem("blackBoardView", JSON.stringify(blackView));
      localStorage.setItem("whitePlayer", JSON.stringify(white));

      calculatePlayerStats();
      resetPossibleMoves();
      resetSelection();
    }

    // black
    if (
      playerColour === "black" &&
      selectedPoint.occupiedBy?.colour === "black" &&
      possibleMoves.includes(0)
    ) {
      whiteView[whiteFromPointIndex].checkerCount =
        checkerCountWhite > 0 ? checkerCountWhite : 0;
      blackView[blackFromPointIndex].checkerCount =
        checkerCountBlack > 0 ? checkerCountBlack : 0;

      setWhiteBoardView(whiteView);
      setBlackBoardView(whiteView);

      setBlack((prev) => ({
        ...prev,
        offCount: prev.offCount + 1,
        homeCount: prev.homeCount - 1,
        canBareOff: false,
      }));

      localStorage.setItem("whiteBoardView", JSON.stringify(whiteView));
      localStorage.setItem("blackBoardView", JSON.stringify(blackView));
      localStorage.setItem("blackPlayer", JSON.stringify(black));

      calculatePlayerStats();
      resetPossibleMoves();
      resetSelection();
    }
  };

  const calculatePlayerStats = () => {
    const whiteView = [...whiteBoardView];
    const blackView = [...blackBoardView];

    let whiteBearingOffCount: number = 0;
    let blackBearingOffCount: number = 0;

    whiteView.forEach((point) => {
      if (
        point.pointNumber >= 19 &&
        point.pointNumber <= 24 &&
        point.checkerCount > 0 &&
        point.occupiedBy?.colour === "white"
      ) {
        whiteBearingOffCount += point.checkerCount;
      }
    });

    blackView.forEach((point) => {
      if (
        point.pointNumber >= 1 &&
        point.pointNumber <= 6 &&
        point.checkerCount > 0 &&
        point.occupiedBy?.colour === "black"
      ) {
        blackBearingOffCount += point.checkerCount;
      }
    });

    setWhite((prev) => ({ ...prev, homeCount: whiteBearingOffCount }));
    setBlack((prev) => ({ ...prev, homeCount: blackBearingOffCount }));
  };

  const calculatePossibleMoves = (fromPoint: Point) => {
    if (!fromPoint) return;

    resetPossibleMoves();

    let toPoint1: number = 0;
    let toPoint1A: number = 0;
    let toPoint2: number = 0;
    let toPoint2A: number = 0;

    if (fromPoint.occupiedBy?.colour === "white") {
      toPoint1 = fromPoint.pointNumber + dice[0];
      toPoint1A = toPoint1 + dice[1];
      toPoint2 = fromPoint.pointNumber + dice[1];
      toPoint2A = toPoint2 + dice[0];
    }

    if (fromPoint.occupiedBy?.colour === "black") {
      toPoint1 = fromPoint.pointNumber - dice[0];
      toPoint1A = toPoint1 - dice[1];
      toPoint2 = fromPoint.pointNumber - dice[1];
      toPoint2A = toPoint2 - dice[0];
    }

    const whitePossiblePoints: number[] = []; // holds all possible white moves
    const blackPossiblePoints: number[] = []; // holds all possible black moves

    const whiteView = [...whiteBoardView];
    const blackView = [...blackBoardView];

    if (canMoveHere(toPoint1, playerColour, whiteView)) {
      whitePossiblePoints.push(toPoint1);
      if (canMoveHere(toPoint1A, playerColour, whiteView))
        whitePossiblePoints.push(toPoint1A);
    }
    if (canMoveHere(toPoint2, playerColour, whiteView)) {
      whitePossiblePoints.push(toPoint2);
      if (canMoveHere(toPoint2A, playerColour, whiteView))
        whitePossiblePoints.push(toPoint2A);
    }

    if (canMoveHere(toPoint1, playerColour, blackView)) {
      blackPossiblePoints.push(toPoint1);
      if (canMoveHere(toPoint1A, playerColour, blackView))
        blackPossiblePoints.push(toPoint1A);
    }

    if (canMoveHere(toPoint2, playerColour, blackView)) {
      blackPossiblePoints.push(toPoint2);
      if (canMoveHere(toPoint2A, playerColour, blackView))
        blackPossiblePoints.push(toPoint2A);
    }

    whiteView.forEach((point) => {
      if (
        whitePossiblePoints.includes(point.pointNumber) &&
        point.pointNumber !== fromPoint.pointNumber
      ) {
        point.possibleMove = true;
      }
    });

    blackView.forEach((point) => {
      if (
        blackPossiblePoints.includes(point.pointNumber) &&
        point.pointNumber !== fromPoint.pointNumber
      ) {
        point.possibleMove = true;
      }
    });

    // calculate bearing off
    if (playerColour === "white" && white.homeCount + white.offCount === 15) {
      if (
        toPoint1 === 25 ||
        toPoint1A === 25 ||
        toPoint2 === 25 ||
        toPoint2A === 25
      ) {
        whitePossiblePoints.push(25);
        blackPossiblePoints.push(25);
        setWhite((prev) => ({
          ...prev,
          canBareOff: true,
        }));
      } else {
        setWhite((prev) => ({
          ...prev,
          canBareOff: false,
        }));
      }
    }
    if (playerColour === "black" && black.homeCount + black.offCount === 15) {
      if (
        toPoint1 === 0 ||
        toPoint1A === 0 ||
        toPoint2 === 0 ||
        toPoint2A === 0
      ) {
        whitePossiblePoints.push(0);
        blackPossiblePoints.push(0);
        setBlack((prev) => ({
          ...prev,
          canBareOff: true,
        }));
      } else {
        setBlack((prev) => ({
          ...prev,
          canBareOff: false,
        }));
      }
    }

    if (playerColour === "white") setPossibleMoves(whitePossiblePoints);
    if (playerColour === "black") setPossibleMoves(blackPossiblePoints);

    setWhiteBoardView(whiteView);
    setBlackBoardView(blackView);
  };

  const resetPossibleMoves = () => {
    const whiteView = [...whiteBoardView];
    const blackView = [...blackBoardView];

    whiteView.forEach((point) => (point.possibleMove = false));
    blackView.forEach((point) => (point.possibleMove = false));

    setWhiteBoardView(whiteView);
    setBlackBoardView(blackView);
    setPossibleMoves([]);
  };

  const addToBar = (playerColor: PlayerColour) => {
    if (playerColor === "white") {
      setWhite((prev) => ({
        ...prev,
        barCount: prev.barCount + 1,
      }));
    }

    if (playerColor === "black") {
      setBlack((prev) => ({
        ...prev,
        barCount: prev.barCount + 1,
      }));
    }
  };

  const removeFromBar = (playerColor: PlayerColour) => {
    if (playerColor === "white") {
      setWhite((prev) => ({
        ...prev,
        barCount: prev.barCount - 1 >= 0 ? prev.barCount - 1 : 0,
      }));
    }
    if (playerColor === "black") {
      setBlack((prev) => ({
        ...prev,
        barCount: prev.barCount - 1 >= 0 ? prev.barCount - 1 : 0,
      }));
    }
  };

  const resetBar = () => {
    setWhite((prev) => ({
      ...prev,
      barCount: 0,
    }));

    setBlack((prev) => ({
      ...prev,
      barCount: 0,
    }));
  };

  const resetGame = () => {
    resetPossibleMoves();
    resetSelection();
    resetDice();
    resetBar();
    setWhiteBoardView(defaultWhiteBoard);
    setBlackBoardView(defaultBlackBoard);
    setPoints(
      view === "WhiteHomeBoard" ? defaultWhiteBoard : defaultBlackBoard
    );
    resetPlayers();

    localStorage.removeItem("player");
    localStorage.removeItem("whiteBoardView");
    localStorage.removeItem("blackBoardView");
  };

  const devAction = () => {
    const devWhiteBoard: Point[] = [
      {
        pointNumber: 12,
        checkerCount: 0,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 11,
        checkerCount: 0,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 10,
        checkerCount: 0,
        occupiedBy: { colour: "black", barCount: 0, offCount: 0, homeCount: 0 },
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 9,
        checkerCount: 0,
        occupiedBy: { colour: "black", barCount: 0, offCount: 0, homeCount: 0 },
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 8,
        checkerCount: 0,
        occupiedBy: { colour: "black", barCount: 0, offCount: 0, homeCount: 0 },
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 7,
        checkerCount: 0,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 6,
        checkerCount: 2,
        occupiedBy: { colour: "black", barCount: 0, offCount: 0, homeCount: 0 },
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 5,
        checkerCount: 2,
        occupiedBy: { colour: "black", barCount: 0, offCount: 0, homeCount: 0 },
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 4,
        checkerCount: 0,
        occupiedBy: { colour: "black", barCount: 0, offCount: 0, homeCount: 0 },
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 3,
        checkerCount: 5,
        occupiedBy: { colour: "black", barCount: 0, offCount: 0, homeCount: 0 },
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 2,
        checkerCount: 2,
        occupiedBy: { colour: "black", barCount: 0, offCount: 0, homeCount: 0 },
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 1,
        checkerCount: 0,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 13,
        checkerCount: 0,
        occupiedBy: { colour: "black", barCount: 0, offCount: 0, homeCount: 0 },
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 14,
        checkerCount: 0,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 15,
        checkerCount: 0,
        occupiedBy: { colour: "black", barCount: 0, offCount: 0, homeCount: 0 },
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 16,
        checkerCount: 0,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 17,
        checkerCount: 0,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 18,
        checkerCount: 0,
        occupiedBy: null,
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 19,
        checkerCount: 5,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 20,
        checkerCount: 1,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 21,
        checkerCount: 3,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 22,
        checkerCount: 2,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 23,
        checkerCount: 3,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 24,
        checkerCount: 1,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
    ];
    const devBlackBoard: Point[] = [
      {
        pointNumber: 24,
        checkerCount: 1,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 23,
        checkerCount: 3,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 22,
        checkerCount: 2,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 21,
        checkerCount: 3,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 20,
        checkerCount: 1,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 19,
        checkerCount: 5,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 18,
        checkerCount: 0,
        occupiedBy: null,
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 17,
        checkerCount: 0,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 16,
        checkerCount: 0,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 15,
        checkerCount: 0,
        occupiedBy: { colour: "black", barCount: 0, offCount: 0, homeCount: 0 },
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 14,
        checkerCount: 0,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 13,
        checkerCount: 0,
        occupiedBy: { colour: "black", barCount: 0, offCount: 0, homeCount: 0 },
        location: "top",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 1,
        checkerCount: 5,
        occupiedBy: { colour: "black", barCount: 0, offCount: 0, homeCount: 0 },
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 2,
        checkerCount: 5,
        occupiedBy: { colour: "black", barCount: 0, offCount: 0, homeCount: 0 },
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 3,
        checkerCount: 5,
        occupiedBy: { colour: "black", barCount: 0, offCount: 0, homeCount: 0 },
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 4,
        checkerCount: 0,
        occupiedBy: { colour: "black", barCount: 0, offCount: 0, homeCount: 0 },
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 5,
        checkerCount: 0,
        occupiedBy: { colour: "black", barCount: 0, offCount: 0, homeCount: 0 },
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 6,
        checkerCount: 0,
        occupiedBy: { colour: "black", barCount: 0, offCount: 0, homeCount: 0 },
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 7,
        checkerCount: 0,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 8,
        checkerCount: 0,
        occupiedBy: { colour: "black", barCount: 0, offCount: 0, homeCount: 0 },
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 9,
        checkerCount: 0,
        occupiedBy: { colour: "black", barCount: 0, offCount: 0, homeCount: 0 },
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 10,
        checkerCount: 0,
        occupiedBy: { colour: "black", barCount: 0, offCount: 0, homeCount: 0 },
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 11,
        checkerCount: 0,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
      {
        pointNumber: 12,
        checkerCount: 0,
        occupiedBy: { colour: "white", barCount: 0, offCount: 0, homeCount: 0 },
        location: "bottom",
        selected: false,
        possibleMove: false,
        bareOff: false,
      },
    ];

    resetGame();
    setPoints(devBlackBoard);
    setWhiteBoardView(devWhiteBoard);
    setBlackBoardView(devBlackBoard);
    setView("BlackHomeBoard");
  };

  return (
    <GamePlayContext.Provider
      value={{
        loading,
        view,
        points,
        selectedPoint,
        selectedBarColour,
        dice,
        playerColour,
        possibleMoves,

        white,
        black,

        swopView,
        swopPlayer,
        roll,
        selectChecker,
        selectPoint,
        selectBar,
        moveChecker,
        moveToBar,
        moveBareOff,
        addToBar,
        removeFromBar,
        resetGame,
        devAction,
      }}
    >
      {children}
    </GamePlayContext.Provider>
  );
}

export function useGamePlay() {
  const context = React.useContext(GamePlayContext);

  if (!context) {
    throw new Error("Unable to use Game Play Context.");
  }
  return context;
}
