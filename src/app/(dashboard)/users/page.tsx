import * as React from "react";
import { UsersTableExample } from "@/components/data-table/users-table-example";

export default function UsersPage() {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
          Loading users...
        </div>
      }
    >
      <UsersTableExample />
    </React.Suspense>
  );
}
