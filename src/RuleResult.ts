interface RuleResult {
    /**
     * Is the rule relevant for this node?
     */
    relevant: boolean;

    /**
     * did the rule pass?
     * if the rule is not relevant then the rule should pass
     */
    pass: boolean;

    /**
     * message
     */
    message?: string;
}
