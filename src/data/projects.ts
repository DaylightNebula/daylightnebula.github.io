/**
 * Link
 *
 * Fields:
 * * label: Text shown for the link
 * * url: Where the link goes
 */
export interface Link {
  label: string;
  url: string;
}

/**
 * Shot
 *
 * Fields:
 * * src: Path to the image under `public`
 * * alt: Description of the image for screen readers
 * * caption: Short caption shown under the image
 */
export interface Shot {
  src: string;
  alt: string;
  caption: string;
}

/**
 * Demo
 *
 * Fields:
 * * title: Name of the demo
 * * path: Path to the demo's `index.html` under `public`
 * * description: What the demo shows and how to interact with it
 * * poster: Screenshot shown before the demo is started
 */
export interface Demo {
  title: string;
  path: string;
  description: string;
  poster: string;
}

/**
 * CodeSample
 *
 * Fields:
 * * title: What the sample shows
 * * language: Language name shown above the code
 * * code: The source text
 */
export interface CodeSample {
  title: string;
  language: string;
  code: string;
}

/**
 * Part
 *
 * Fields:
 * * name: Name of the crate, module or repository
 * * url: Link to its source, if it has its own
 * * description: What the part does within the project
 */
export interface Part {
  name: string;
  url?: string;
  description: string;
}

/**
 * Project
 *
 * Fields:
 * * slug: URL segment for the project's page
 * * name: Project name
 * * summary: One sentence shown on the card
 * * language: Main language, shown in the meta line
 * * meta: Short facts shown in mono on the card, such as commit counts.  Projects with demos also
 *   get a "Runs in the browser" marker, so it doesn't belong here
 * * tags: Technologies and topics
 * * repos: Source repositories, the main one first
 * * cover: Image shown on the card and at the top of the page
 * * problem: Paragraph on what the project solves and why it exists
 * * approach: Paragraphs on how it works
 * * highlights: Specific results or technical points, strongest first
 * * parts: Crates, modules or sibling repositories that make up the project
 * * demos: Web builds that run in the browser
 * * gallery: Screenshots
 * * code: Code samples
 * * compare: Two code samples shown side by side, input then output
 */
export interface Project {
  slug: string;
  name: string;
  summary: string;
  language: string;
  meta: string[];
  tags: string[];
  repos: Link[];
  cover?: Shot;
  problem: string;
  approach: string[];
  highlights: string[];
  parts: Part[];
  demos: Demo[];
  gallery: Shot[];
  code: CodeSample[];
  compare?: [CodeSample, CodeSample];
}

const gh = "https://github.com/DaylightNebula";
const dsh = "https://github.com/DaylinSoftwareHouse";

export const projects: Project[] = [
  {
    slug: "gearbox",
    name: "Gearbox engine",
    summary:
      "A from-scratch Rust runtime built on a lock-granular concurrent ECS that has sustained 100K+ simulated entities, with a fixed-tick scheduler, a wgpu renderer and an SDF UI",
    language: "Rust",
    meta: ["4 crates", "200+ commits"],
    tags: ["Rust", "ECS", "WGPU", "WebAssembly", "SDF UI", "Concurrency"],
    repos: [
      { label: "Gearbox", url: `${gh}/Gearbox` },
      { label: "Anarchy", url: `${gh}/Anarchy` },
      { label: "iso_ui", url: `${gh}/iso_ui` },
      { label: "skeletal", url: `${gh}/skeletal` }
    ],
    cover: {
      src: "/images/gearbox-cover.jpg",
      alt: "Cobblestone textured shapes next to a code editor panel, both drawn by Gearbox",
      caption: "Textured shapes from the 3D renderer next to a text input from the SDF UI, both from headless engine runs"
    },
    problem:
      "General purpose engines lock big pieces of the world while systems run, which caps how much work can happen in parallel. I wanted an engine where systems only wait on each other when they touch the exact same data, and where the update loop, rendering and UI are small enough to understand end to end.",
    approach: [
      "Anarchy is the ECS underneath. Every component of every entity has its own borrow flag and every resource its own lock, so two systems only block each other on the same piece of data. Entities with the same components share column tables stored in fixed-size chunks, queries skip straight to the tables holding their rarest component, and idle executor threads help finish work that a system splits into a parallel iterator.",
      "Gearbox builds the app on top. It runs the update graph at a fixed tick rate on its own threads, independent of rendering, and renders through wgpu with shaders written in Rust by Shader Magician. The same code builds for desktop and for the web through WebAssembly and WebGL.",
      "The UI is drawn as signed distance fields in a single fullscreen pass: rectangles, circles, bezier strokes, glyphs and vector icons, laid out like CSS flexbox with taffy. It supports retained entity widgets and immediate mode widgets, text inputs with selection and undo, scroll areas and context menus."
    ],
    highlights: [
      "Sustained 100K+ concurrently simulated entities in solar system simulations on Anarchy",
      "Per-component locking, so systems contend only on the exact data they share",
      "Runtime reflection, a text serialization format and a TCP control socket so editors and a CLI can inspect and mutate live state",
      "Deterministic headless runs with fixed time steps and PNG snapshots for regression tests, CI and AI agents. The images on this page came from that mode",
      "Skinned glTF and FBX models with GPU skinning, and rapier3d physics behind a feature flag",
      "Ships a Claude Code plugin that teaches AI assistants the engine's API and its current limits"
    ],
    parts: [
      { name: "Anarchy", url: `${gh}/Anarchy`, description: "The concurrent ECS: storage, queries, scheduling, events, reflection and scenes" },
      { name: "Gearbox", url: `${gh}/Gearbox`, description: "App framework and wgpu renderer, with Cell folded in" },
      { name: "iso_ui", url: `${gh}/iso_ui`, description: "The SDF UI, now the ui module of Gearbox" },
      { name: "skeletal", url: `${gh}/skeletal`, description: "Skinned mesh loading, animation and GPU skinning, now behind the skeletal feature" },
      { name: "mutual", url: `${dsh}/mutual`, description: "Lock-light concurrent maps, sets, lists and copy-on-write values that Anarchy is built on" },
      { name: "vault", url: `${gh}/vault`, description: "Reference-counted GPU asset loading" },
      { name: "gearbox_rapier", url: `${gh}/gearbox_rapier`, description: "rapier3d physics driving and driven by transforms" }
    ],
    demos: [
      {
        title: "Shapes",
        path: "/demos/gearbox-shapes/",
        description: "Every primitive from ShapeBuilder with one textured material, rotated each tick by an update system",
        poster: "/images/gearbox-shapes.png"
      }
    ],
    gallery: [],
    code: [
      {
        title: "Systems are plain functions",
        language: "Rust",
        code: `fn movement(mut query: Query<(&'static mut Position, &'static Velocity)>) {
    while let Some((_entity, (mut position, velocity))) = query.next().unwrap() {
        position.0 += velocity.0;
    }
}

fn main() -> anyhow::Result<()> {
    App::new()
        .add_plugin(GearboxRenderPlugin)
        .on_render_startup(setup)
        .on_update(movement)
        .run()
}`
      },
      {
        title: "Retained UI from entity widgets",
        language: "Rust",
        code: `let code = UiBundle::new(Node::new().size(px(400.0), px(200.0)))
    .text(Text::new(font.clone(), "let x = y;", Vec4::ONE, 16.0))
    .spans([
        TextSpan::new(0..3).color(srgb(0x569CD6)),
        TextSpan::new(8..9).wavy(srgb(0xF14C4C)).hover("unknown \`y\`"),
    ])
    .with(TextInput::new("let x = y;").multiline())
    .interactive();`
      }
    ]
  },
  {
    slug: "daylin-microservices",
    name: "Daylin Microservices",
    summary:
      "A Kotlin service-mesh framework: self-registering microservices with discovery, schema-validated RPC, typed cross-service errors and containerized test rigs",
    language: "Kotlin",
    meta: ["3 modules", "138 commits", "Published on JitPack"],
    tags: ["Kotlin", "Ktor", "Microservices", "Docker", "Consul", "Service discovery"],
    repos: [{ label: "DaylinMicroservices", url: `${gh}/DaylinMicroservices` }],
    problem:
      "Every new service in a backend repeats the same work: start a server, register somewhere so other services can find it, parse and check requests, and call other services safely. I wanted that work written once, so a new service is just its name and its endpoints.",
    approach: [
      "A Microservice is created from a config (name, tags, port) and a map of named endpoints. Each endpoint takes and returns JSON, and runs on an embedded Ktor server that picks a free port when none is set.",
      "Services register themselves on start and keep a cache of every other running service, refreshed in the background, so they can look peers up by id, name or tag and react when one starts or stops. Discovery began on Consul and later moved to a small register service of its own.",
      "Requests are checked against a schema before an endpoint runs, with required, optional and default fields, lists and nested objects. Endpoints return a Result that is either a value or an error, so failures travel between services as data instead of exceptions.",
      "Services detect when they run inside Docker and work out their own address, and a script generates Docker Compose test rigs with many services for local testing."
    ],
    highlights: [
      "A new service is a config and a map of endpoints, with registration, health pings and shutdown handled for you",
      "Look up other services by name or tag, and get callbacks as services join and leave",
      "Schema validation and typed results on every request between services",
      "Runs in Docker, with generated multi-service test rigs",
      "Documented and published on JitPack for other developers to use"
    ],
    parts: [
      { name: "DaylinMicroservices-Core", description: "The Microservice class, its config, the request client and the service cache" },
      { name: "DaylinMicroservices-Register", description: "The register service that tracks which services are running" },
      { name: "DaylinMicroservices-Serializables", description: "Schemas, validation and the Result type shared by every service" }
    ],
    demos: [],
    gallery: [],
    code: [
      {
        title: "A service with one endpoint",
        language: "Kotlin",
        code: `val service = Microservice(
    MicroserviceConfig("greeter", tags = listOf("greeter")),
    endpoints = hashMapOf(
        "hello" to (Schema("name" to SchemaElement.String()) to { json ->
            Result.Ok(JSONObject().put("message", "Hello \${json.getString("name")}"))
        })
    )
)
service.start()`
      }
    ]
  },
  {
    slug: "shader-magician",
    name: "Shader Magician",
    summary:
      "A macro that turns Rust functions into WGSL shaders, a parser for WGSL, and a GPU layer that removes most wgpu boilerplate",
    language: "Rust",
    meta: ["3 crates", "98 commits"],
    tags: ["Rust", "Proc macros", "Compilers", "WGSL", "WGPU"],
    repos: [{ label: "shader_magician", url: `${dsh}/shader_magician` }],
    problem:
      "Writing wgpu code means keeping Rust structs and WGSL shader code in sync by hand, and writing a lot of setup code for every buffer, binding and pipeline. A typo between the two sides only shows up at runtime.",
    approach: [
      "magician-rust is an attribute macro. Mark a Rust function with #[shader] and a build step turns it into WGSL, along with the structs and bind groups it uses, so the layout is defined once in Rust.",
      "magician-ast is a syn-like library that parses and prints WGSL. It made the transpiler possible and lets Rust code inspect and rewrite shaders.",
      "magician-vgpu wraps wgpu in a VirtualGpu that handles the common setup. Gearbox renders through it."
    ],
    highlights: [
      "Compute and render shaders, workgroup memory, builtins, uniforms and storage buffers written as plain Rust",
      "Bind group layouts generated from #[derive(ShaderGroup)] structs, so the Rust and WGSL sides can't drift",
      "Tested against real GPU compute output, including a bf16 matrix-vector kernel",
      "The renderer for every Gearbox demo on this site"
    ],
    parts: [
      { name: "magician-rust", description: "The #[shader] macro and the Rust to WGSL transpiler" },
      { name: "magician-ast", description: "A syn-like WGSL parser and printer" },
      { name: "magician-vgpu", description: "A simplified GPU API over wgpu" }
    ],
    demos: [],
    gallery: [],
    code: [],
    compare: [
      {
        title: "Written in Rust",
        language: "Rust",
        code: `#[derive(ShaderGroup)]
pub struct MatvecBindings {
    #[uniform] dims: UVec4,
    #[read] w: RuntimeArray<u32>,
    #[read] x: RuntimeArray<f32>,
    #[write] y: RuntimeArray<f32>,
    #[workgroup] partial: [f32; 64],
}

#[shader("./shader_out", compute(64))]
pub fn matvec_main(#[group = 0] mut b: MatvecBindings, ids: MatvecIds) {
    let row = ids.wg.x() + ids.wg.y() * ids.nwg.x();
    if row >= b.dims.x() { return; }

    let pairs = b.dims.y() / 2u32;
    let base = row * pairs;
    let mut acc = 0.0f32;
    let mut i = ids.lid;
    while i < pairs {
        let packed = b.w[(base + i) as usize];
        acc += bitcast_f32(packed << 16u32) * b.x[(2u32 * i) as usize]
            + bitcast_f32(packed & 0xffff0000u32) * b.x[(2u32 * i + 1u32) as usize];
        i += 64u32;
    }
    // ...
}`
      },
      {
        title: "Generated WGSL",
        language: "WGSL",
        code: `struct MatvecIds {
    @builtin(workgroup_id) wg: vec3<u32>,
    @builtin(num_workgroups) nwg: vec3<u32>,
    @builtin(local_invocation_index) lid: u32,
}

var<workgroup> partial: array<f32, 64>;
@group(0) @binding(1)
var<storage> w: array<u32>;
@group(0) @binding(0)
var<uniform> dims: vec4<u32>;
@group(0) @binding(2)
var<storage> x: array<f32>;
@group(0) @binding(3)
var<storage, read_write> y: array<f32>;

@compute @workgroup_size(64, 1, 1)
fn matvec_main(ids: MatvecIds) {
    var acc: f32 = 0f;
    var i: u32;
    var s: u32 = 32u;

    let row = (ids.wg.x + (ids.wg.y * ids.nwg.x));
    let _e11 = dims.x;
    if (row >= _e11) {
        return;
    }
    let _e15 = dims.y;
    let pairs = (_e15 / 2u);
    let base = (row * pairs);
    i = ids.lid;
    loop {
        let _e23 = i;
        if (_e23 < pairs) {
        } else {
            break;
        }
        {
            let _e26 = i;
            let packed = w[(base + _e26)];
            let _e30 = acc;
            let _e36 = i;
            let _e39 = x[(2u * _e36)];
            let _e46 = i;
            let _e51 = x[((2u * _e46) + 1u)];
            acc = (_e30 + ((bitcast<f32>((packed << 16u)) * _e39) + (bitcast<f32>((packed & 4294901760u)) * _e51)));
            let _e55 = i;
            i = (_e55 + 64u);
        }
    }
    // ...
}`
      }
    ]
  },
  {
    slug: "diegetic-soup",
    name: "Diegetic Soup",
    summary:
      "A server-driven UI framework with flexbox layout that streams only per-client state diffs over the wire, so bandwidth scales with change, not UI size",
    language: "Kotlin",
    meta: ["Java + Kotlin APIs", "Published on JitPack"],
    tags: ["Kotlin", "Java", "Minestom", "Paper", "Networking", "Layout"],
    repos: [{ label: "DiegeticSoup", url: `${gh}/DiegeticSoup` }],
    cover: {
      src: "/images/diegetic-flexbox.jpg",
      alt: "A shop panel and flexbox alignment examples floating in a Minecraft world",
      caption: "A shop panel built in Java, and every justify-content and align-items value"
    },
    problem:
      "Menus in Minecraft servers are usually flat inventory screens. UIs placed in the world look far better, but every piece is a real entity the server has to track, and naive updates flood players with packets.",
    approach: [
      "UIs are built from text and item display entities that only exist as packets, so they cost the server no real entities.",
      "Each UI is a controller with three parts: who can see it, where it is, and what is drawn. Every tick the controller renders the element and compares it with what each viewer last received, then sends only the spawns, updates, moves and removals that are needed. A static UI sends nothing after it spawns.",
      "Layout works like CSS flexbox, with wrapping text and backgrounds. Buttons, toggles, radio groups, tabs and sliders respond to left and right clicks, with hover highlights per viewer or shared."
    ],
    highlights: [
      "Per-entity diffing, so bandwidth tracks what changed, not how big the UI is",
      "Java builders and a Kotlin DSL over the same API",
      "Smooth client-side interpolation for animation and movement",
      "Tested end to end against a real Minecraft client with NebsClient, which also took these screenshots"
    ],
    parts: [
      { name: "diegetic-core", description: "Controllers, elements, builders, the Kotlin DSL and flexbox layout. Platform independent" },
      { name: "diegetic-minestom", description: "Minestom support, tested end to end" },
      { name: "diegetic-paper", description: "Paper support through PacketEvents" }
    ],
    demos: [],
    gallery: [
      { src: "/images/diegetic-hub.jpg", alt: "Demo hub with every station side by side", caption: "The demo hub, with every station in one world" },
      { src: "/images/diegetic-basics.jpg", alt: "Animated item and text displays", caption: "Animated displays built with the Kotlin DSL and the Java builders" },
      { src: "/images/diegetic-widgets.jpg", alt: "Settings panel with tabs and a shared counter", caption: "A tabbed settings panel and a counter shared by everyone" },
      { src: "/images/diegetic-widgets-clicked.jpg", alt: "The shared counter after three clicks", caption: "The counter after three clicks, with the hover highlight" },
      { src: "/images/diegetic-hud-view.jpg", alt: "A HUD that follows the player's view", caption: "A per-player HUD that follows the view" },
      { src: "/images/diegetic-animation.jpg", alt: "Orbiting items with and without interpolation", caption: "Stepped motion next to the same motion with interpolation" }
    ],
    code: [
      {
        title: "A floating, animated label in the Kotlin DSL",
        language: "Kotlin",
        code: `diegetic {
    viewers = StaticViewerController(listOf(MinestomPlayer(player)))
    position = StaticPositionController(MinestomLocation(pos))

    element {
        scale { Vector3f(0.5f + 0.1f * sin(System.currentTimeMillis() / 300.0).toFloat()) }
        draw { item = MinestomItem(ItemStack.of(Material.DIAMOND)) }
        draw {
            text = Component.text("Hello world")
            translation = Vector3f(0f, 0.6f, 0f)
        }
    }
}`
      }
    ]
  },
  {
    slug: "meld",
    name: "Meld",
    summary:
      "A protocol-level TCP server for a third-party binary protocol, where every subsystem down to authentication is a hot-swappable module",
    language: "Kotlin",
    meta: ["135 commits", "Longest running project"],
    tags: ["Kotlin", "Networking", "TCP", "Protocols", "Modular design"],
    repos: [{ label: "Meld", url: `${gh}/Meld` }],
    cover: {
      src: "/images/meld-1.jpg",
      alt: "A vanilla Minecraft client connected to a Meld server, standing in front of a small wooden house",
      caption: "A vanilla client connected to Meld"
    },
    problem:
      "Existing Minecraft servers ship the whole vanilla game and let plugins change parts of it. For fully custom games, most of that is dead weight that still costs memory and CPU.",
    approach: [
      "Meld implements the network protocol and nothing else. The server is an interface between modules and clients and adds no gameplay by itself.",
      "Login, players, worlds, entities and inventories are standard modules a game can use, swap or leave out. Modules hook in through events, raw packets and bundles.",
      "The networking layer uses proven TCP techniques to stay light and fast, and the design aims to support Java and Bedrock clients."
    ],
    highlights: [
      "Full Java edition support, with Bedrock in progress",
      "Every gameplay feature, down to login, is a replaceable module",
      "135 commits, my longest running project"
    ],
    parts: [
      { name: "Meld-Module-Login", description: "Handles the login sequence" },
      { name: "Meld-Module-Player", description: "Player state" },
      { name: "Meld-Module-World", description: "World loading and chunks" },
      { name: "Meld-Module-Entities", description: "Entity tracking" },
      { name: "Meld-Module-Inventories", description: "Inventories and containers" }
    ],
    demos: [],
    gallery: [],
    code: []
  }
];

/**
 * Experiment
 *
 * Fields:
 * * name: Experiment name
 * * url: Link to the repository
 * * language: Main language
 * * summary: One sentence on what it is
 */
export interface Experiment {
  name: string;
  url: string;
  language: string;
  summary: string;
}

export const experiments: Experiment[] = [
  {
    name: "DeltosEditor",
    url: `${gh}/DeltosEditor`,
    language: "Rust",
    summary: "An editor framework on top of the Gearbox engine stack"
  },
  {
    name: "Modular",
    url: `${gh}/Modular`,
    language: "Kotlin",
    summary: "Run every function marked with your own annotation, with type-checked arguments and a Minestom module"
  },
  {
    name: "mod_plugins_bevy",
    url: `${gh}/mod_plugins_bevy`,
    language: "Rust",
    summary: "An attribute macro that turns a Rust module into a Bevy plugin, with systems marked by attributes"
  }
];

/**
 * Finds a project by its slug.
 *
 * @param slug - URL segment of the project to find.
 * @returns The matching project, or `undefined` when no project has that slug.
 */
export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
