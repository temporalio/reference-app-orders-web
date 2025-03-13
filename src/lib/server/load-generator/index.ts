import { generateOrders } from '$lib/types/order';
import { env } from '$env/dynamic/private';

class LoadGenerator {
  private running: boolean = false;
  private orderInterval: number | null = null;
  private pollInterval: number | null = null;

  private config = {
    ordersPerSecond: 1,
    pollFrequency: 500, // How often to poll shipments (ms)
  };

  public start(config?: Partial<typeof this.config>) {
    if (this.running) return;
    this.running = true;

    if (config) {
      this.config = { ...this.config, ...config };
    }

    const orderDelay = 1000 / this.config.ordersPerSecond;
    this.orderInterval = setInterval(() => this.createOrder(), orderDelay);
    this.pollInterval = setInterval(() => this.pollShipments(), this.config.pollFrequency);

    console.log('Load generator started');
  }

  public isRunning() {
    return this.running;
  }

  public getConfig() {
    return this.config;
  }

  // Stop the load generator
  public stop() {
    if (!this.running) return;
    this.running = false;

    if (this.orderInterval) {
      clearInterval(this.orderInterval);
      this.orderInterval = null;
    }
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }

    console.log('Load generator stopped');
  }

  private async createOrder() {
    const order = generateOrders(1)[0];
    try {
      await fetch(`${env.ORDER_API_URL}/orders`, {
          method: 'POST',
          body: JSON.stringify(order),
        });
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  }

  private async pollShipments() {
    try {
      const response = await fetch(`${env.SHIPMENT_API_URL}/shipments`);
      const shipments = await response.json();

      for (const shipment of shipments) {
        if (shipment.status === 'completed') continue;

        var next = "";

        if (shipment.status === 'booked') {
          next = 'dispatched';
        } else if (shipment.status === 'dispatched') {
          next = 'delivered';
        }

        if (next != '') {
          try {
            await fetch(`${env.SHIPMENT_API_URL}/shipments/${shipment.id}/status`, {
              method: 'POST',
              body: JSON.stringify({ status: next }),
            });
          } catch (error) {
            console.error('Failed to update shipment status:', error);
          }
        }
      }
    } catch (error) {
      console.error('Failed to poll shipments:', error);
    }
  }
}

// Export singleton instance
export const loadGenerator = new LoadGenerator();