/**
 * Tile registry service for managing stable tile IDs for animations
 */

export class TileRegistryService {
  private static instance: TileRegistryService;
  private registry = new Map<string, string>();
  private idCounter = 0;

  private constructor() {}

  public static getInstance(): TileRegistryService {
    if (!TileRegistryService.instance) {
      TileRegistryService.instance = new TileRegistryService();
    }
    return TileRegistryService.instance;
  }

  public getTileId(row: number, col: number): string {
    const posKey = `${row}-${col}`;
    
    if (!this.registry.has(posKey)) {
      this.registry.set(posKey, `tile-${this.idCounter++}`);
    }
    
    return this.registry.get(posKey)!;
  }

  public cleanupUnusedPositions(activePositions: Set<string>): void {
    for (const [posKey] of this.registry) {
      if (!activePositions.has(posKey)) {
        this.registry.delete(posKey);
      }
    }
  }

  public reset(): void {
    this.registry.clear();
    this.idCounter = 0;
  }

  public getRegistrySize(): number {
    return this.registry.size;
  }
}