"use client";

import { PasteConcilationTable } from "@/components/molecules/tables/ConcilationTables/PasteConcilationTable/PasteConcilationTable";
import { StateConcilationTable } from "@/components/molecules/tables/ConcilationTables/StateConcilationTable/StateConcilationTable";
import { useState } from "react";

export const MassConcilationView = () => {
  const [currentView, setCurrentView] = useState<"paste" | "state">("paste");

  return (
    <div>
      <div>
        <button onClick={() => setCurrentView("paste")}>Paste</button>
        <button onClick={() => setCurrentView("state")}>State</button>
      </div>
      {currentView === "paste" ? <PasteConcilationTable /> : <StateConcilationTable />}
    </div>
  );
};
