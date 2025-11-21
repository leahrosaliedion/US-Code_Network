// src/types.ts

export type NodeType = 'section' | 'entity' | 'tag';

export interface GraphNode {
  id: string;          // e.g. "section:26-1", "entity:123", "tag:income tax"
  name: string;        // human-readable label (e.g. section_num, entity name, tag)
  val: number;         // used for node size (degree)
  totalVal?: number;   // degree before filtering
  color?: string;
  baseColor?: string;
  node_type?: NodeType;

  // Section-specific metadata (optional for non-section nodes)
  section_num?: string | number;
  section_heading?: string | null;
  title?: string | number;
  title_heading?: string | null;
  terms?: string | null;
  tags?: string | null;
  aux_verbs?: string | null;
  section_text?: string | null;

  // Entity-specific metadata (optional for non-entity nodes)
  department?: string | null;
  total_mentions?: number | null;
  entity?: string | null;
}

export interface GraphLink {
  source: string;       // node id
  target: string;       // node id
  action: string;       // used in UI; mirrors edge_type
  location?: string;
  timestamp?: string;

  edge_type?: string;   // 'citation' | 'section_entity' | 'section_tag', etc.
  weight?: number;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

// Relationship objects for lists / right sidebar.
export interface Relationship {
  id: number;
  doc_id: string;
  timestamp: string | null;
  actor: string;          // label of source node
  action: string;
  target: string;         // label of target node
  location: string | null;
  tags: string[];

  actor_type?: NodeType;
  target_type?: NodeType;
  actor_id?: string;      // underlying node id, e.g. "section:26-1"
  target_id?: string;
}

export interface Actor {
  name: string;
  connection_count: number;
}

export interface Stats {
  totalDocuments: { count: number }; // e.g. total sections
  totalTriples: { count: number };   // total links
  totalActors: { count: number };    // e.g. total entities + tags
  categories: { category: string; count: number }[];
}

export interface Document {
  doc_id: string;
  file_path: string;
  one_sentence_summary: string;
  paragraph_summary: string;
  category: string;
  date_range_earliest: string | null;
  date_range_latest: string | null;
}

export interface TagCluster {
  id: number;
  name: string;
  exemplars: string[];
  tagCount: number;
}
