type QueryResult = { data: any[] | null; error?: Error | null }

export const supabase = {
  from(_table: string) {
    return {
      select: async (_columns?: string): Promise<QueryResult> => ({ data: [], error: null }),
      insert: async (rows: any[]): Promise<QueryResult> => ({ data: rows, error: null }),
    }
  },
  channel(_name: string) {
    return {
      on: function () {
        return this
      },
      subscribe: async () => true,
    }
  },
  removeChannel(_channel: unknown) {
    return undefined
  },
}
