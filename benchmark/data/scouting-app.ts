/**
 * This data comes from a project that heavily influenced ZBI, a scouting app made for my robotics team
 * The app can be found at https://github.com/KennanHunter/scouting
 *
 * Data can be found at https://github.com/KennanHunter/scouting/blob/1ba30dd1cd05171d01ecfbedec058262cd9d5a62/src/stores/match/matchTypes.ts
 *
 * The app encodes data collected by watching a match in a QR code
 * JSON takes up too much space for a QR code
 */

// cspell:ignore coopertition teleop 2023inpri

import { z } from "zod";

export const scoutingData: z.infer<typeof scoutingSchema> = {
  scouter: "Kennan Hunter",
  matchLevel: "Quarterfinals",
  matchNumber: 3,
  teamNumber: 3494,
  teamNoShow: false,
  autonomousStartingLocation: { x: 0.5, y: 0.5 },
  autonomousLeftCommunityZone: true,
  autonomousGridData: {
    gridColumns: [
      { level2: 4, level1: 0, hybridCone: 0, hybridCube: 0 },
      { level2: 3, level1: 0, hybridCone: 0, hybridCube: 0 },
      { level2: 0, level1: 0, hybridCone: 1, hybridCube: 0 },
      { level2: 0, level1: 0, hybridCone: 0, hybridCube: 0 },
      { level2: 0, level1: 0, hybridCone: 0, hybridCube: 0 },
      { level2: 0, level1: 0, hybridCone: 0, hybridCube: 0 },
      { level2: 0, level1: 0, hybridCone: 0, hybridCube: 0 },
      { level2: 0, level1: 0, hybridCone: 0, hybridCube: 0 },
      { level2: 0, level1: 0, hybridCone: 0, hybridCube: 0 },
    ],
    history: [{ column: 2, level: 1 }],
  },
  autonomousParking: "DockEngage",
  teleopGroundPickups: 0,
  teleopSubstation1Pickups: 1,
  teleopSubstation2LowPickups: 0,
  teleopSubstation2HighPickups: 0,
  teleopRunnerRobot: false,
  teleopGridData: {
    gridColumns: [
      { level2: 0, level1: 1, hybridCone: 0, hybridCube: 0 },
      { level2: 0, level1: 2, hybridCone: 0, hybridCube: 0 },
      { level2: 0, level1: 0, hybridCone: 0, hybridCube: 0 },
      { level2: 0, level1: 0, hybridCone: 0, hybridCube: 0 },
      { level2: 0, level1: 0, hybridCone: 0, hybridCube: 0 },
      { level2: 0, level1: 0, hybridCone: 0, hybridCube: 0 },
      { level2: 0, level1: 0, hybridCone: 0, hybridCube: 0 },
      { level2: 0, level1: 0, hybridCone: 0, hybridCube: 0 },
      { level2: 0, level1: 0, hybridCone: 0, hybridCube: 0 },
    ],
    history: [],
  },
  endgameParking: "None",
  endgameCoopertitionBonus: false,
  endgameRobotsDocked: 1,
  endgameLinksCompleted: 3,
  defenseRating: "Effective",
  diedOnField: false,
  comments: "Comment test",
  autonomousDockedToChargeStation: false,
  autonomousChargeStationEngaged: false,
  endgameTippedChargeStation: false,
  side: "Blue 2",
  eventCode: "2023inpri",
  time: 1685042275066,
};

const AutoParkState = () => z.enum(["None", "DockEngage", "Dock"]);

const EndgameParkState = () => z.enum(["None", "DockEngage", "Dock", "Park"]);

const DefenseRating = () =>
  z.enum(["Not Played", "Not Effective", "Effective", "Very Effective"]);

const MatchLevel = () =>
  z.enum(["Qualifications", "Quarterfinals", "Semifinals", "Finals"]);

const TeamPosition = () =>
  z.enum(["Red 1", "Red 2", "Red 3", "Blue 1", "Blue 2", "Blue 3"]);

const FieldPoint = () =>
  z.object({
    x: z.number().min(0).max(1),
    y: z.number().min(0).max(1),
  });

export const GridColumn = () =>
  z.object({
    level2: z.number().min(0),
    level1: z.number().min(0),
    hybridCone: z.number().min(0),
    hybridCube: z.number().min(0),
  });

const GridHistoryEntry = () =>
  z.object({
    column: z.number(),
    level: z.number(),
  });

const GridData = () =>
  z.object({
    gridColumns: z.tuple([
      GridColumn(),
      GridColumn(),
      GridColumn(),
      GridColumn(),
      GridColumn(),
      GridColumn(),
      GridColumn(),
      GridColumn(),
      GridColumn(),
    ]),
    history: GridHistoryEntry().array(),
  });

export const scoutingSchema = z.object({
  eventCode: z.string().optional(),
  side: TeamPosition().optional(),
  scouter: z.string(),
  matchLevel: MatchLevel(),
  matchNumber: z.number(),
  teamNumber: z.number(),

  teamNoShow: z.boolean(),

  autonomousStartingLocation: FieldPoint(),
  autonomousLeftCommunityZone: z.boolean(),
  autonomousDockedToChargeStation: z.boolean(),
  autonomousChargeStationEngaged: z.boolean(),

  autonomousGridData: GridData(),

  autonomousParking: AutoParkState(),

  teleopGroundPickups: z.number().min(0),
  teleopSubstation1Pickups: z.number().min(0),
  teleopSubstation2LowPickups: z.number().min(0),
  teleopSubstation2HighPickups: z.number().min(0),
  teleopRunnerRobot: z.boolean(),
  teleopGridData: GridData(),
  endgameParking: EndgameParkState(),
  endgameCoopertitionBonus: z.boolean(),
  endgameRobotsDocked: z.number().min(0).max(3),
  endgameLinksCompleted: z.number().min(0).max(9),
  endgameTippedChargeStation: z.boolean(),

  defenseRating: DefenseRating(),
  diedOnField: z.boolean(),
  comments: z.string(),
  time: z.number().optional(),
});
