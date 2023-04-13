import { Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { WsResponseDto } from 'src/_shared_dto/ws-response.dto';


@Catch(WsException, HttpException)
export class WebsocketExceptionsFilter extends BaseWsExceptionFilter {
	private readonly logger = new Logger(WebsocketExceptionsFilter.name);

	catch(exception: WsException | HttpException, host: ArgumentsHost) {
		const client = host.switchToWs().getClient() as WebSocket;
		const data = host.switchToWs().getData();
		const error = exception instanceof WsException ? exception.getError() : exception.getResponse();
		const details = error instanceof Object ? { ...error } : { message: error };
		
		const status = (error as any).statusCode;
		const message = (error as any).message;

		// this.logger.warn(`${status} ${message}`);

		
		let res: WsResponseDto<undefined> = {error: `${status} ${message}`, value: undefined} 

		client.send(JSON.stringify({
			event: "error",
			data: {
				id: (client as any).id,
				rid: data.rid,
				...details
			}
		}));

		// client.send(JSON.stringify(res));
	}
}
