import type { WorkspaceItem } from "./types";

export const catalogue: WorkspaceItem[] = [
  // Desks
  {
    id: "desk-teak",
    name: "Teak Classic Desk",
    category: "desk",
    monthlyPrice: 35,
    shape: "desk-standard",
    description: "Solid reclaimed teak, 140cm wide. The Canggu staple.",
  },
  {
    id: "desk-standing",
    name: "Sit-Stand Desk",
    category: "desk",
    monthlyPrice: 55,
    shape: "desk-standing",
    description: "Electric height adjustment, bamboo top.",
  },
  {
    id: "desk-corner",
    name: "Corner Studio Desk",
    category: "desk",
    monthlyPrice: 45,
    shape: "desk-corner",
    description: "L-shaped rattan and wood desk for dual setups.",
  },
  // Chairs
  {
    id: "chair-task",
    name: "Mesh Task Chair",
    category: "chair",
    monthlyPrice: 20,
    shape: "chair-task",
    description: "Breathable mesh back, ideal for the tropics.",
  },
  {
    id: "chair-ergo",
    name: "Ergonomic Pro Chair",
    category: "chair",
    monthlyPrice: 40,
    shape: "chair-ergonomic",
    description: "Full lumbar support with adjustable armrests.",
  },
  {
    id: "chair-stool",
    name: "Bamboo Stool",
    category: "chair",
    monthlyPrice: 8,
    shape: "chair-stool",
    description: "Minimalist woven-seat stool for short sessions.",
  },
  // Monitors
  {
    id: "monitor-24",
    name: '24" Full HD Monitor',
    category: "monitor",
    monthlyPrice: 18,
    shape: "monitor-single",
    description: "Crisp 1080p panel with HDMI and USB-C input.",
  },
  {
    id: "monitor-ultrawide",
    name: '34" Ultrawide Monitor',
    category: "monitor",
    monthlyPrice: 38,
    shape: "monitor-ultrawide",
    description: "Curved 1440p ultrawide for serious multitasking.",
  },
  // Lamps
  {
    id: "lamp-desk",
    name: "Rattan Desk Lamp",
    category: "lamp",
    monthlyPrice: 6,
    shape: "lamp-desk",
    description: "Warm light through a handwoven rattan shade.",
  },
  {
    id: "lamp-floor",
    name: "Arc Floor Lamp",
    category: "lamp",
    monthlyPrice: 12,
    shape: "lamp-floor",
    description: "Tall arc lamp with dimmable warm-white bulb.",
  },
  // Plants
  {
    id: "plant-monstera",
    name: "Monstera",
    category: "plant",
    monthlyPrice: 5,
    shape: "plant-large",
    description: "Large potted monstera, watered weekly by our team.",
  },
  {
    id: "plant-succulent",
    name: "Succulent Trio",
    category: "plant",
    monthlyPrice: 3,
    shape: "plant-small",
    description: "Three small succulents in ceramic pots.",
  },
  // Accessories
  {
    id: "acc-laptop-stand",
    name: "Laptop Stand",
    category: "accessory",
    monthlyPrice: 4,
    shape: "accessory-generic",
    description: "Aluminium riser for better ergonomics.",
  },
  {
    id: "acc-keyboard-mouse",
    name: "Keyboard & Mouse Set",
    category: "accessory",
    monthlyPrice: 7,
    shape: "accessory-generic",
    description: "Wireless low-profile keyboard with silent mouse.",
  },
];
