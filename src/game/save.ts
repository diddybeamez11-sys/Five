const KEY = "fnad.save.v1";
const VERSION = 1;

export interface SaveData {
  version: number;
  night: number;
  unlockedCustom: boolean;
  beaten: boolean;
  muted: boolean;
  shake: boolean;
}

const defaults: SaveData = {
  version: VERSION,
  night: 1,
  unlockedCustom: false,
  beaten: false,
  muted: false,
  shake: true,
};

function migrate(raw: Partial<SaveData>): SaveData {
  return { ...defaults, ...raw, version: VERSION };
}

export function loadSave(): SaveData {
  try {
    const t = localStorage.getItem(KEY);
    if (!t) return { ...defaults };
    return migrate(JSON.parse(t) as Partial<SaveData>);
  } catch {
    return { ...defaults };
  }
}

export function writeSave(patch: Partial<SaveData>) {
  try {
    const next = { ...loadSave(), ...patch, version: VERSION };
    localStorage.setItem(KEY, JSON.stringify(next));
    return next;
  } catch {
    return { ...defaults, ...patch };
  }
}
