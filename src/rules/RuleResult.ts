import ts from "typescript";

/**
 * Result from a rule
 */
export interface RuleResult {node: ts.Node, issue: string};
