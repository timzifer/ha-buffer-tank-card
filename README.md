# Buffer Tank Card

A Lovelace custom card for Home Assistant that visualizes a stratified buffer
(heat storage) tank. It renders a vertical tank with a smooth temperature
gradient built from layer data, draws each temperature probe as a tick plus
label, and — in integration mode — highlights the thermocline band.

The card has two modes:

- **Mode A (integration entity)** — reads pre-computed layer, probe and
  thermocline data directly from a single sensor entity exposed by the
  companion buffer tank integration. One-line configuration.
- **Mode B (manual sensors)** — build the gradient yourself from any set of
  temperature sensors and their physical probe positions in the tank. No
  integration required.

## Installation

### HACS (custom repository)

1. In HACS go to *Frontend → ⋮ → Custom repositories*.
2. Add `https://github.com/timzifer/ha-buffer-tank-card` with category
   *Lovelace*.
3. Install **Buffer Tank Card**, then reload your browser.

### Manual

1. Download `ha-buffer-tank-card.js` from the latest GitHub release.
2. Copy it into `/config/www/` on your Home Assistant instance.
3. Add the resource in *Settings → Dashboards → Resources*:
   - URL: `/local/ha-buffer-tank-card.js`
   - Type: `JavaScript Module`

## Mode B — manual sensors

```yaml
type: custom:buffer-tank-card
tank_height: 2000          # mm, required
sensors:
  - entity: sensor.probe_top
    name: Oben
    position: 1800         # mm from the tank bottom
  - entity: sensor.probe_middle
    position: 1000
  - entity: sensor.probe_bottom
    position: 200
min_temperature: 20
max_temperature: 80
color_hot: "#d32f2f"
color_cold: "#1976d2"
probe_side: alternating    # left | right | alternating
show_stats: true
tap_action:
  action: more-info
```

Probes are sorted by position. Between adjacent probes the card interpolates
linearly; above the topmost and below the bottommost probe the temperature is
held constant (clamped). The thermocline band is not rendered in Mode B.

## Mode A — integration entity

```yaml
type: custom:buffer-tank-card
entity: sensor.my_tank_state_of_charge
```

The card reads the following attributes from the entity:

| Attribute | Meaning |
| --- | --- |
| `layers` | Array of temperatures, bottom → top |
| `tank_height_mm` | Physical tank height |
| `probes` | Array of `{ entity, name, position_mm, temperature, virtual }` |
| `thermocline_position_mm` | Center of the thermocline band |
| `thermocline_thickness_mm` | Thickness of the band |
| `max_temperature` | Upper bound of the color scale |
| `min_temperature` | Lower bound of the color scale (preferred) |
| `reference_temperature` | Lower bound of the color scale (fallback, same basis as heat-loss reference) |

The entity `state` is rendered as the *State of Charge* in the overlay.

You can still override `min_temperature`, `max_temperature`, colors, probe
side, `show_stats`, `show_thermocline`, and the actions in YAML.

## Configuration reference

| Option | Default | Notes |
| --- | --- | --- |
| `entity` | — | Mode A. Sensor entity from the buffer tank integration. |
| `tank_height` | — | Mode B. Tank height in millimeters. |
| `sensors[]` | — | Mode B. List of `{ entity, name?, position }`. |
| `min_temperature` | attr `min_temperature` or `reference_temperature` or `20` | Lower color-scale bound. |
| `max_temperature` | attr `max_temperature` or `80` | Upper color-scale bound. |
| `color_cold` | `#1976d2` | Gradient base color. |
| `color_hot` | `#d32f2f` | Gradient top color. |
| `probe_side` | `alternating` | `left`, `right`, or `alternating`. |
| `show_stats` | `true` | Overlay with Ø, Δ and (Mode A) SoC. |
| `show_thermocline` | `true` (Mode A) | Set to `false` to hide the hatched band. |
| `heat_exchanger` | — | Optional coiled heat exchanger overlay. See below. |
| `name` | — | Optional card header. |
| `tap_action`, `hold_action`, `double_tap_action` | — | Standard HA actions. |

## Heat exchanger overlay

Draws a coiled (helical) heat exchanger inside the tank. The coil's color
gradient runs along the wendel from its supply end (top turn) to its return end
(bottom turn); both ends are mapped onto the tank's `min_temperature` /
`max_temperature` range (cold → `color_cold`, hot → `color_hot`). If the coil
is disabled it is rendered as a semi-transparent outline only.

```yaml
heat_exchanger:
  position: bottom                      # top | bottom (default: bottom)
  supply_entity: sensor.coil_supply_temp
  return_entity: sensor.coil_return_temp
  enabled: binary_sensor.coil_active    # boolean or entity id; default true
  turns: 6                              # default 6
  height_fraction: 0.35                 # fraction of the tank height, default 0.35
```

| Option | Default | Notes |
| --- | --- | --- |
| `heat_exchanger.position` | `bottom` | Where the coil sits (`top` or `bottom`). |
| `heat_exchanger.supply_entity` | — | Sensor for the supply-side (top of coil) temperature. |
| `heat_exchanger.return_entity` | — | Sensor for the return-side (bottom of coil) temperature. |
| `heat_exchanger.enabled` | `true` | Boolean, or an entity id (e.g. `binary_sensor.coil_active`, `switch.*`, `input_boolean.*`) whose state decides on/off. When off, only the outline is drawn (no fill, slightly transparent). |
| `heat_exchanger.turns` | `6` | Number of visible coil turns. |
| `heat_exchanger.height_fraction` | `0.35` | Fraction of the tank height the coil occupies. |

## Development

```bash
npm install
npm run build    # emits dist/ha-buffer-tank-card.js
npm run watch    # live rebuild during development
```

Copy the built bundle to `/config/www/ha-buffer-tank-card.js`, register it as
a resource, and add a card of type `custom:buffer-tank-card`.

## License

MIT
