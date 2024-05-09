module.exports = {
  extends: ["next", "prettier", "next/core-web-vitals"],
  plugins: ["react", "react-hooks", "prettier"],
  rules: {
    "no-unused-vars": [
      "warn",
      {
        args: "after-used",
        caughtErrors: "none",
        ignoreRestSiblings: true,
        vars: "all"
      }
    ],
    "prefer-const": "error",
    "react-hooks/exhaustive-deps": "error"
  }
};
